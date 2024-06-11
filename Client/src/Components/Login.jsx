import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='d-flex flex-column justify-content-center align-items-center gap-2 vh-100 bg text-white'>
            <h2>Task Management</h2>
            <div className='col-10 col-sm-6 col-md-3 rounded-4 p-3 bg-main d-flex flex-column gap-2'>
                <h4>Login</h4>

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
                    <div className='position-relative mt-2'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            placeholder='Password'
                            className='form-control'
                            autoComplete='current-password'  
                        />
                        {
                            !showPassword ?
                                <i className="position-absolute end-0 translate-middle top-50 text-black fa-solid fa-eye-slash" onClick={() => setShowPassword(!showPassword)}></i> :
                                <i className="position-absolute end-0 top-50 translate-middle text-black fa-solid fa-eye" onClick={() => setShowPassword(!showPassword)}></i>
                        }
                    </div>
                </form>

                <button type='submit' className='btn btn-primary rounded-3 mt-2'>
                    Login
                </button>

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
