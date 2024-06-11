import React from 'react';

import './style.scss'

const Home = () => {
    const title = [
        {
            icon: "fa-solid fa-house",
            title: "All tasks"
        },
        {
            icon: "fa-solid fa-bookmark",
            title: "Important tasks!"
        },
        {
            icon: "fa-solid fa-square-check",
            title: "Completed tasks"
        },
        {
            icon: "fa-solid fa-clipboard-list",
            title: "Processing tasks"
        },
    ]

    return (
        <div className='p-4 bg-black text-white d-flex gap-4 vh-100'>
            <div className='col-2 p-3 border rounded-4 border-secondary d-flex flex-column justify-content-between'>
                {/* user */}
                <div>
                    <h4>Username</h4>
                    <p>Email@gmail.com</p>
                    <hr />
                </div>

                {/* dashboard */}
                <div>
                    <ul className='list-unstyled'>
                        {title.map((item, index) => {
                            return (<div className='d-flex align-items-center fs-6 px-3 py-2 hover-gb-grey'>
                                <i className={item.icon}></i>
                                <li className='ps-3'>
                                    {item.title}
                                </li>
                            </div>)
                        })}
                    </ul>
                </div>

                {/* logout */}
                <div className='d-flex align-items-center text-center p-2 mx-auto gap-2 hover-gb-grey'>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <h6 className='mb-0'>Sign Out</h6>
                </div>
            </div>

            <div className='col-10 p-3 border rounded-4 border-secondary'>Main Content</div>
        </div>
    );
}

export default Home;
