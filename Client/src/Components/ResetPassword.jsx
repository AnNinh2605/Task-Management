import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.scss'
import validate from '../Utils/validateInput.js';
import userService from '../Services/userService.js';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { resetToken } = useParams();
    const validateNoSpaces = validate.noSpaceValidate;

    const defaultPasswordShow = {
        password: false,
        confirmPassword: false
    }
    const [passwordStatus, setPasswordStatus] = useState(defaultPasswordShow);
    const togglePasswordVisibility = (name) => {
        setPasswordStatus(prevStatus => ({
            ...prevStatus,
            [name]: !prevStatus[name]
        }));
    };

    const HandleResetPassword = async (data) => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        }

        try {
            const responseServer = await userService.resetPasswordService(password, resetToken);

            toast.success(responseServer.data.message);
            navigate('/login');
        } catch (error) {
            const errorMS = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMS);
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100 bg'>
            <h2 className='mb-3 text-white'>Task Management</h2>
            <div className='p-3 col-10 col-md-6 col-xl-4 border rounded bg-main text-white'>
                <h4>Reset Password</h4>
                <hr></hr>

                <form onSubmit={handleSubmit(HandleResetPassword)}>
                    {/* hidden input username for User Accessibility that needs to be supported by tool */}
                    <input type="text" id="username" name="username" aria-label="username" className="visually-hidden" autoComplete="username" />

                    <div className='form-group position-relative'>
                        <label htmlFor="password" className='form-label'>New password:</label>
                        <input
                            type={passwordStatus.password ? "text" : "password"}
                            id='password'
                            className='form-control'
                            placeholder="Password"
                            autoComplete="new-password"
                            {...register("password",
                                {
                                    required: "This field is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password required at least 3 characters"
                                    },
                                    validate: validateNoSpaces
                                })
                            }
                        />
                        <div
                            className='position-absolute top-50 end-0'
                            onClick={() => togglePasswordVisibility("password")}
                        >
                            <i className={passwordStatus.password ? "fa-solid fa-eye text-black pt-2 pe-2" : "fa-solid fa-eye-slash text-black pt-2 pe-2"}></i>
                        </div>
                    </div>
                    {errors.password && <small className='text-warning'>{errors.password.message}</small>}

                    <div className='form-group mt-2 position-relative'>
                        <label htmlFor="confirmPassword" className='form-label'>Confirm password: </label>
                        <input
                            type={passwordStatus.confirmPassword ? "text" : "password"}
                            id='confirmPassword'
                            className='form-control'
                            placeholder="Confirm password"
                            autoComplete="new-password"
                            {...register("confirmPassword",
                                { required: "Please enter again your password", validate: validateNoSpaces })
                            }
                        />
                        <div
                            className='position-absolute top-50 end-0'
                            onClick={() => togglePasswordVisibility("confirmPassword")}
                        >
                            <i className={passwordStatus.confirmPassword ? "fa-solid fa-eye text-black pt-2 pe-2" : "fa-solid fa-eye-slash text-black pt-2 pe-2"}></i>
                        </div>
                    </div>
                    {errors.confirmPassword &&
                        <small className='text-warning'>
                            {errors.confirmPassword.message}
                        </small>}

                    <hr></hr>
                    <div className='mt-2 d-flex justify-content-end'>
                        <button
                            className='btn btn-secondary fs-6 fw-bold me-2'
                            onClick={() => navigate('/login')}>
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className='btn btn-primary fs-6 fw-bold'>Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;