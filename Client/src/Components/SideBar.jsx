import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import './style.scss'
import userService from '../Services/userService';

const SideBar = () => {
    const navigate = useNavigate();

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
            const responseServer = await userService.getUserService(userId);

            setUserData(responseServer.data.data);
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }
    }
    const signOut = () => {
        navigate('/login');
    }

    useEffect(() => {
        getUserData();
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
                        signOut();
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
