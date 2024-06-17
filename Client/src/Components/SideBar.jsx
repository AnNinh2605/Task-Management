import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'

import './style.scss'

const SideBar = () => {
    const navigate = useNavigate();

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

    const signOut = () => {
        alert("Sign out");
        navigate('/login');
    }

    return (
        <div className='col-2 border rounded-4 border-secondary d-flex flex-column justify-content-between bg-main text-white px-0'>
            {/* user */}
            <div className='mt-3 text-center'>
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
                className='d-flex align-items-center text-center p-2 mx-auto gap-2 hover-gb-grey mb-3' role='button'
                onClick={() => {
                    signOut();
                }}
            >
                <i className="fa-solid fa-right-from-bracket"></i>
                <h6 className='mb-0'>Sign Out</h6>
            </div>
        </div>
    );
}

export default SideBar;
