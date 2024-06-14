import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { jwtDecode } from "jwt-decode";

import validate from '../Utils/validateInput';
import userService from '../Services/userService.js'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const noSpaceValidate = validate.noSpaceValidate;

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (data) => {
        try {
            const responseServer = await userService.loginService(data);

            const access_token = responseServer.data.data.access_token;
            const decodedToken = jwtDecode(access_token);
            const userId = decodedToken._id;
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: userId
            })
            
            localStorage.setItem("access_token", access_token);

            navigate('/');
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-2 vh-100 bg text-white'>
            <h2>Task Management</h2>
            <div className='col-10 col-sm-6 col-md-3 rounded-4 p-3 bg-main d-flex flex-column gap-2'>
                <h4>Login</h4>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div>
                        <input
                            type="email"
                            id='email'
                            className='form-control'
                            placeholder='Email'
                            autoComplete='on'
                            {...register("email",
                                {
                                    required: 'This field is required',
                                    validate: noSpaceValidate
                                }
                            )}
                        />
                        {errors.email && <small className='text-warning'>{errors.email.message}</small>}
                    </div>
                    <div className='mt-2'>
                        <div className="position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                placeholder='Password'
                                className='form-control'
                                autoComplete='current-password'
                                {...register("password",
                                    {
                                        required: 'This field is required',
                                        validate: noSpaceValidate,
                                    }
                                )}
                            />
                            {
                                !showPassword ?
                                    <i className="position-absolute end-0 translate-middle top-50 text-black fa-solid fa-eye-slash" onClick={() => setShowPassword(!showPassword)}></i> :
                                    <i className="position-absolute end-0 top-50 translate-middle text-black fa-solid fa-eye" onClick={() => setShowPassword(!showPassword)}></i>
                            }
                        </div>
                        {errors.password && <small className='text-warning'>{errors.password.message}</small>}
                    </div>

                    <button type='submit' className='btn btn-primary w-100 rounded-3 mt-3'>
                        Login
                    </button>
                </form>

                <Link to='#' className='text-center text-decoration-none'>Forgot password?</Link>
                <hr className='my-1' />

                <button className='btn btn-success rounded-3 mx-auto'
                    onClick={() => navigate('/register')}>
                    Create new account
                </button>
            </div>
        </div>
    );
}

export default Login;
