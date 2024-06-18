import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import NotFound from './Components/NotFound.jsx';
import Layout from './Components/Layout.jsx';
import ForgotPassword from './Components/ForgotPassword.jsx';
import ResetPassword from './Components/ResetPassword.jsx'

import AllTask from './Components/TaskComponents/AllTask.jsx';
import ImportantTask from './Components/TaskComponents/ImportantTask.jsx';
import CompletedTask from './Components/TaskComponents/CompletedTask.jsx';
import ProcessingTask from './Components/TaskComponents/ProcessingTask.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/password-forgot' element={<ForgotPassword />} />
                    <Route path='/password-reset/:resetToken' element={<ResetPassword />} />
                    <Route path='/'
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }>
                        <Route index element={<AllTask />} />
                        <Route path='/important' element={<ImportantTask />}></Route>
                        <Route path='/completed' element={<CompletedTask />}></Route>
                        <Route path='/processing' element={<ProcessingTask />}></Route>
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter >

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </>
    )
}

export default App
