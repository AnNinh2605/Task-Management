import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

import '../style.scss'

const SideBar = () => {
    const navigate = useNavigate();

    const title = [
        {
            icon: "fa-solid fa-house",
            title: "All tasks",
            to: '/'
        },
        {
            icon: "fa-solid fa-bookmark",
            title: "Important tasks!",
            to: '/important'
        },
        {
            icon: "fa-solid fa-square-check",
            title: "Completed tasks",
            to: '/completed'
        },
        {
            icon: "fa-solid fa-clipboard-list",
            title: "Processing tasks",
            to: '/processing'
        },
    ]

    const signOut = () => {
        alert("Sign out");
        navigate('/login');
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className='p-4 bg text-white d-flex gap-4 vh-100'>
                    <div className='col-2 p-3 border rounded-4 border-secondary d-flex flex-column justify-content-between bg-main'>
                        {/* user */}
                        <div className='text-center'>
                            <h4>Username</h4>
                            <p>Email@gmail.com</p>
                            <hr />
                        </div>

                        {/* dashboard */}
                        <div>
                            <ul className='nav flex-column'>
                                {title.map((item, index) => {
                                    return (
                                        <li key={`dashboard-${index}`} className="nav-item">
                                            <NavLink
                                                className='nav-link text-decoration-none d-flex align-items-center fs-6 px-3 py-2 text-white hover-gb-grey'
                                                to={item.to}
                                            >
                                                <i className={item.icon}></i>
                                                <div className='ps-3'>{item.title}</div>
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        {/* logout */}
                        <div
                            className='d-flex align-items-center text-center p-2 mx-auto gap-2 hover-gb-grey' role='button'
                            onClick={() => {
                                signOut();
                            }}
                        >
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <h6 className='mb-0'>Sign Out</h6>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
