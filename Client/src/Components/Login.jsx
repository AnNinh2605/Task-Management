import React from 'react';

const Login = () => {

    return (
        <div className='d-flex justify-content-center vh-100 align-items-center'>
            <div className='col-3 border rounded-4 p-3 bg-secondary text-white d-flex flex-column'>
                <h5>Login</h5>
                <form className='d-flex flex-column gap-3'>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            className='form-control'
                            placeholder='Email'
                        />
                    </div>
                    <div className='position-relative'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            placeholder='Password'
                            className='form-control'
                        />
                       <i className="position-absolute end-0 top-50 text-black pe-2 pt-1 fa-solid fa-eye-slash"></i> 
                        {/* <i className="position-absolute end-0 top-50 text-black pe-2 pt-1 fa-solid fa-eye"></i> */}
                    </div>
                </form>
                <button type='submit' className='btn btn-primary mt-4 rounded-3 px-3'>
                    Login
                </button>
                <a className='text-center text-decoration-none'>Forgotten password?</a>
                <hr />
                <button className='btn btn-success w-75 mx-auto'>Create new account</button>
            </div>
        </div>
    );
}

export default Login;
