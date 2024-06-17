import React from 'react';
import { Outlet } from 'react-router-dom'

import './style.scss'
import SideBar from './SideBar';

const Layout = () => {
    return (
        <div className='container-fluid'>
            <div className="row vh-100 bg p-4 gap-4">
                <SideBar />
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;