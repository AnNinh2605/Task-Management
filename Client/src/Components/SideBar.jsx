import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode";

import './style.scss'
import userService from '../Services/userService';
import taskService from '../Services/taskService';

const SideBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = useSelector(state => state.user.userId);

    const title = [
        {
            icon: "fa-solid fa-house",
            title: "All tasks",
            to: '/'
        },
        {
            icon: "fa-solid fa-clipboard-list",
            title: "Processing tasks",
            to: '/processing'
        },
        {
            icon: "fa-solid fa-square-check",
            title: "Completed tasks",
            to: '/completed'
        },
        {
            icon: "fa-solid fa-bookmark",
            title: "Important tasks!",
            to: '/important'
        },
    ]
    const [userData, setUserData] = useState([]);

    const getUserData = async () => {
        try {
            const responseServer = await taskService.getUserService(userId);

            setUserData(responseServer.data.data);
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }
    }

    const logOut = async () => {
        try {
            await taskService.logoutService();

            localStorage.removeItem("access_token");
            navigate('/login');
        } catch (error) {
            const errorMS = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMS);
        }
    }

    const refreshToken = async () => {
        try {
            const responseServer = await userService.refreshTokenService();
            const accessToken = responseServer.data.data.access_token;
            const decodedToken = jwtDecode(accessToken);
            const userId = decodedToken._id;

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: userId
            })

            localStorage.setItem("access_token", accessToken);
        } catch (error) {
            const errorMS = error.response ? error.response.data.message : 'An error occurred';
            toast.error(errorMS);
        }
    };

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            refreshToken();
        }, 1 * 60 * 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <div className='col-2 border rounded-4 border-secondary d-none d-md-flex flex-column justify-content-between bg-main text-white px-0'>
                {/* user */}
                <div className='mt-3 text-center'>
                    <h4>{userData.username}</h4>
                    <span>{userData.email}</span>
                    <hr />
                </div>

                {/* dashboard */}
                <div>
                    <ul className='nav flex-column'>
                        {title.map((item, index) => {
                            return (
                                <li key={`dashboard-${index}`} className="nav-item">
                                    <NavLink
                                        className='nav-link text-decoration-none d-flex align-items-center text-white hover-gb-grey justify-content-start fs-6'
                                        to={item.to}
                                    >
                                        <i className={item.icon}></i>
                                        <span className='ms-2'>{item.title}</span>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/* logout */}
                <div
                    className='d-flex align-items-center text-center p-2 mx-auto gap-2 hover-gb-grey mb-3' role='button'
                    onClick={() => {
                        logOut();
                    }}
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <h6 className='mb-0'>Sign Out</h6>
                </div>

            </div>

            <button
                className="btn bg-white btn-outline-white d-block d-md-none"
                data-bs-toggle="collapse" data-bs-target="#bar" aria-expanded="false"
                aria-controls="demo"
                type="button"
            >
                <i className="fas fa-bars"></i>
            </button>

            <div className="collapse" id="bar">
                <ul className='nav flex-column'>
                    {title.map((item, index) => {
                        return (
                            <li key={`dashboard-${index}`} className="nav-item">
                                <NavLink
                                    className='nav-link text-decoration-none d-flex align-items-center text-white hover-gb-grey justify-content-start fs-6'
                                    to={item.to}
                                >
                                    <i className={item.icon}></i>
                                    <span className='ms-2'>{item.title}</span>
                                </NavLink>
                            </li>
                        )
                    })}
                    <div
                        className='d-flex align-items-center text-center p-2 mx-auto gap-2 hover-gb-grey mb-3 text-white mt-2' role='button'
                        onClick={() => {
                            signOut();
                        }}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <h6 className='mb-0'>Sign Out</h6>
                    </div>
                </ul>
            </div>
        </>
    );
}

export default SideBar;
