import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import nodemailer from 'nodemailer';

import UserModel from '../Models/UserModel.js'
import errorHandler from '../utils/errorHandler.js';
import validate from '../utils/validation.js'

const saltRounds = 10;

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
};
const generateRefreshToken = (payload) => {
    return jwt.sign({ _id: payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
const generateResetToken = (payload) => {
    return jwt.sign({ _id: payload }, process.env.RESET_TOKEN_SECRET, { expiresIn: '15m' });
}

const register = async (req, res) => {
    const { username, email, password } = req.body;

    // check input data
    const schema = Joi.object({
        username: Joi.string()
            .trim()
            .min(1)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    })

    const { error } = schema.validate(req.body);

    if (error) {
        console.error('Validation error:', error.details[0].message);

        return res.status(400).json({
            status: "error",
            message: "Invalid input data. Please check and try again.",
        });
    }

    try {
        const isExistingUser = await UserModel.findOne({ email: email });
        if (isExistingUser) {
            return res.status(409).json({
                status: "error",
                message: "Email already exists"
            })
        }

        await UserModel.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, saltRounds)
        });

        return res.status(201).json({
            status: "success",
            message: "Create user successfully",
        });
    } catch (error) {
        errorHandler(res, error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // check input data
    const checkValidate = validate({ email: email, password: password });
    if (checkValidate) {
        return res.status(400).json(checkValidate);
    }

    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Username/password is not correct",
            });
        }

        const isTruePassword = bcrypt.compareSync(password, user.password);
        if (!isTruePassword) {
            return res.status(401).json({
                status: "error",
                message: "Username/password is not correct",
            });
        }

        const payload = {
            _id: user._id,
        }

        // create accessToken & refreshToken
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // set refreshToken cookie with an expiration time equal to the expiration time of the refresh token 7d
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        await UserModel.updateOne({ _id: user._id }, { $set: { refreshToken: refreshToken } });

        return res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: {
                access_token: accessToken
            }
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        return res.status(400).json({
            status: "error",
            message: "No refresh token provided"
        });
    }

    try {
        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await UserModel.findById(decodedToken._id);

        if (!user || !user.refreshToken.includes(refreshToken)) {
            return res.status(401).send('Invalid refresh token');
        }

        const payload = {
            _id: user._id,
        }

        const accessToken = generateAccessToken(payload);

        return res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: {
                access_token: accessToken,
            }
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    // check input data
    const checkValidate = validate({ email: email });

    if (checkValidate) {
        return res.status(400).json(checkValidate);
    }

    try {
        const findUser = await UserModel.findOne({ email: email })
        if (!findUser) {
            return res.status(404).json({
                status: "error",
                message: "Email not found. Please check your email and try again."
            });
        }

        // generate reset token and save to database
        const userId = findUser._id;
        const resetToken = generateResetToken(userId);

        await UserModel.updateOne({ _id: userId }, { $set: { resetToken: resetToken } });

        // send reset code to email
        const sendToEmail = "levu260598@gmail.com";
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const sendEmail = await transporter.sendMail({
            to: sendToEmail,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            html: `
            <div style="text-align: center; margin-top: 20px;">
                <h2>Password Reset</h2>
                <p>Click the button below to reset your password:</p>
                <p>
                    <a href="${process.env.CLIENT_URL}/password-reset/${resetToken}"
                        style="background-color: #4CAF50; 
                        color: white; padding: 10px 20px; 
                        text-decoration: none; border-radius: 5px;"
                        target="_blank"
                    >Reset Password
                    </a>
                </p>
            </div>`,
        });
        
        if (!sendEmail) {
            return res.status(500).json({
                status: "error",
                message: "Unable to send email. Please try again later."
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Email sent successfully. Please check your inbox."
        })
    } catch (error) {
        return errorHandler(res, error);
    }
}

const resetPassword = async (req, res) => {
    const { password, resetToken } = req.body;

    const checkValidate = validate({ password: password });

    if (checkValidate) {
        return res.status(400).json({checkValidate});
    }

    try {
        let decodedResetToken;

        // check valid token
        try {
            decodedResetToken = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).send({ message: 'Request has expired' });
            } else {
                return res.status(401).send({ message: 'Request is invalid' });
            }
        }
        
        // find user to reset password
        const userId = decodedResetToken._id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Not found user'
            });
        }

        // save new password
        await UserModel.updateOne(
            {_id: userId},
            {
                $set: { password: bcrypt.hashSync(password, saltRounds) },
                $unset: { resetToken: "" }
            }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Reset password successful'
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const Controller = {
    register,
    login,
    refreshToken,
    forgotPassword,
    resetPassword
}

export default Controller;
