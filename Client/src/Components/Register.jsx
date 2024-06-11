import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
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

    const passwordInput = (id, placeholder, field) => {
        return (
            <div className='position-relative mt-2'>
                <input
                    type={field ? "text" : "password"}
                    id={id}
                    placeholder={placeholder}
                    className='form-control'
                    autoComplete='current-password'
                />
                {
                    !field ?
                        <i className="position-absolute end-0 translate-middle top-50 text-black fa-solid fa-eye-slash" onClick={() => togglePasswordVisibility(id)}></i> :
                        <i className="position-absolute end-0 top-50 translate-middle text-black fa-solid fa-eye" onClick={() => togglePasswordVisibility(id)}></i>
                }
            </div>
        )
    }
    
    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-2 vh-100 bg text-white'>
            <h2>Task Management</h2>
            <div className='col-10 col-sm-6 col-md-3 rounded-4 p-3 bg-main d-flex flex-column gap-2'>
                <h4>Register</h4>

                <form>
                    <div>
                        <input
                            type="email"
                            id='email'
                            className='form-control'
                            placeholder='Email'
                            autoComplete='on'
                        />
                    </div>
                    {
                        passwordInput("password", "Password", passwordStatus.password)
                    }
                    {
                        passwordInput("confirmPassword", "Confirm password", passwordStatus.confirmPassword)
                    }
                </form>
                <button className='btn btn-success mt-2'>Register</button>

                <hr className='my-1' />

                <Link to='/login' className='text-center text-decoration-none'>Already have an account?</Link>
            </div>
        </div>
    );
}

export default Register;
