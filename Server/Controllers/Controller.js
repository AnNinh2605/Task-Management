import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';

import UserModel from '../Models/UserModel.js'
import errorHandler from '../utils/errorHandler.js';

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

const register = async (req, res) => {
    const saltRounds = 10;
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
    const schema = Joi.object({
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
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Username is not existing",
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

const logout = (req, res) => {
    try {
        res.clearCookie("jwt_token");
        return res.status(204).json({
            status: "success",
            message: "Logout successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const Controller = {
    register,
    login,
    logout,
}

export default Controller;
