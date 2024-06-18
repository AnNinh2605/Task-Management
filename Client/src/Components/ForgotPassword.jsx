import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.scss'
import validate from '../Utils/validateInput.js';
import userService from '../Services/userService.js';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const validateNoSpaces = validate.noSpaceValidate;

    const HandleForgotPassword = async (data) => {
        try {
            const responseServer = await userService.forgotPasswordService(data);
            
            window.confirm(responseServer.data.message);
            navigate('/login');
        } catch (error) {
            const errorMS = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMS);
        }
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100 bg'>
            <h2 className='mb-3 text-white'>Task Management</h2>
            <div className='p-3 col-10 col-md-6 col-xl-4 rounded-4 bg-main text-white'>
                <h4>Find Your Account</h4>
                <hr></hr>
                <p>Please enter your email to search for your account.</p>

                <form onSubmit={handleSubmit(HandleForgotPassword)}>
                    <div className="form-group">
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            autoComplete='on'
                            placeholder="Email"
                            {...register("email",
                                {
                                    required: "Enter your email.",
                                    validate: validateNoSpaces
                                })
                            }
                        />
                        {errors.email && <small className='text-warning'>{errors.email.message}</small>}
                    </div>

                    <hr></hr>
                    <div className='mt-2 d-flex justify-content-end'>
                        <button
                            className='btn btn-secondary fs-6 fw-bold me-2'
                            onClick={() => navigate('/login')}
                        >Cancel
                        </button>

                        <button
                            type="submit"
                            className='btn btn-primary fs-6 fw-bold'
                        >Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;