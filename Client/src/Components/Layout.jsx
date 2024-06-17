import React from 'react';
import { Outlet } from 'react-router-dom'

import './style.scss'
import SideBar from './SideBar';

const Layout = () => {
    return (
        <div className='container-fluid'>
            <div className="row min-vh-100 bg p-3 gap-3">
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;