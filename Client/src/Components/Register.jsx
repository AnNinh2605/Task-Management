import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import validate from '../Utils/validateInput';
import userService from '../Services/userService.js'

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const noSpaceValidate = validate.noSpaceValidate;

    const defaultPasswordStatus = {
        password: false,
        confirmPassword: false
    }
    const [passwordStatus, setPasswordStatus] = useState(defaultPasswordStatus);
    const togglePasswordVisibility = (name) => {
        setPasswordStatus(prevStatus => ({
            ...prevStatus,
            [name]: !prevStatus[name]
        }));
    };

    const isMatchPasword = (data) => {
        return data.password === data.confirmPassword;
    }

    const inputForm = (type, id, placeholder) => {
        return (
            <div className='mt-2'>
                <input
                    type={type}
                    id={id}
                    className='form-control'
                    placeholder={placeholder}
                    autoComplete='on'
                    {...register(id,
                        {
                            required: 'This field is required',
                            validate: noSpaceValidate
                        }
                    )}
                />
                {errors[id] && <small className='text-warning'>{errors[id]?.message}</small>}
            </div>
        )
    }

    const passwordInput = (id, placeholder, show) => {
        return (
            <div className='mt-2'>
                <div className='position-relative'>
                    <input
                        type={show ? "text" : "password"}
                        id={id}
                        placeholder={placeholder}
                        className='form-control'
                        autoComplete='current-password'
                        {...register(id,
                            {
                                required: 'This field is required',
                                validate: noSpaceValidate,
                                minLength: {
                                    value: 6,
                                    message: 'Password required at least 6 characters'
                                }
                            }
                        )}
                    />
                    {
                        show ?
                            <i className="position-absolute end-0 top-50 translate-middle text-black fa-solid fa-eye" onClick={() => togglePasswordVisibility(id)}></i> :
                            <i className="position-absolute end-0 translate-middle top-50 text-black fa-solid fa-eye-slash" onClick={() => togglePasswordVisibility(id)}></i>
                    }
                </div>
                {errors[id] && <small className='text-warning'>{errors[id]?.message}</small>}
            </div>
        )
    }

    const handleRegister = async (data) => {
        // Clean input data
        for (const item in data) {
            data[item] = data[item].trim();
        }

        // check match password
        if (!isMatchPasword(data)) {
            toast.error("Password do not match");
            return;
        }
        const { confirmPassword, ...registerData } = data

        try {
            const serverResponse = await userService.registerService(registerData);

            toast.success(serverResponse.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }

    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-2 vh-100 bg text-white'>
            <h2>Task Management</h2>
            <div className='col-10 col-sm-6 col-md-3 rounded-4 p-4 bg-main d-flex flex-column'>
                <h4>Register</h4>

                <form onSubmit={handleSubmit(handleRegister)}>

                    {inputForm("text", "username", "Username")}
                    {inputForm("email", "email", "Email")}
                    {passwordInput("password", "Password", passwordStatus.password)}
                    {passwordInput("confirmPassword", "Confirm password", passwordStatus.confirmPassword)}

                    <button type='submit' className='btn btn-success w-100 mt-3'>Register</button>
                </form>

                <hr className='my-3' />

                <Link to='/login' className='text-center text-decoration-none'>Already have an account?</Link>
            </div>
        </div>
    );
}

export default Register;
