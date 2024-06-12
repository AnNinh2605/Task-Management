import React, { useState } from 'react';

import './TaskComponentStyle.scss'
import ModalAddTask from '../Modal/ModalAddTask';
import ModalEditTask from '../Modal/ModalEditTask'

const AllTask = () => {
    const [addTaskShow, setAddTaskShow] = useState(false);
    const [editTaskShow, setEditTaskShow] = useState(false);

    const handleClose = () => {
        setAddTaskShow(false);
        setEditTaskShow(false);
    }

    const handleAddTaskShow = () => setAddTaskShow(true);
    const handleEditTaskShow = () => setEditTaskShow(true);

    const taskCard = [
        {
            taskName: "Task name",
            discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sint ea officiis.",
            date: "11/06/2024",
            status: "Completed"
        },
        {
            taskName: "Task name",
            discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sint ea officiis.",
            date: "11/06/2024",
            status: "Completed"
        },
        {
            taskName: "Task name",
            discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In sint ea officiis.",
            date: "11/06/2024",
            status: "Completed"
        },
    ]

    const handleDeleteTask = () => {
        alert("Delete task okok");
    }

    return (
        <div className='col p-4 rounded-4 border border-secondary bg-main'>
            <h4 className='mb-3 pb-1 border-bottom border-3 d-inline-block'>All Tasks</h4>

            <div className="container-fluid px-0">
                <div className="row">
                    <div className='d-flex flex-wrap gap-4'>
                        {taskCard.map((item, index) => {
                            return (
                                <div key={`taskCard-${index}`} className='col-3 border rounded-4 border-secondary bg-taskCard p-3 d-flex flex-column'>
                                    <h5>{item.taskName}</h5>
                                    <small className='mb-2'>{item.discription}</small>
                                    <small className='mb-2'>{item.date}</small>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <button
                                            className='btn btn-sm btn-success rounded-pill'>{item.status}
                                        </button>

                                        <div role="button">
                                            <i className="fa-solid fa-file-pen" title='Edit task'
                                                onClick={() => handleEditTaskShow()}>
                                            </i>
                                            <i className="ms-2 fa-solid fa-trash" title='Delete task'
                                                onClick={() => handleDeleteTask()}
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div
                            className='col-3 border-dashed rounded-4 border-secondary p-3 fs-6 d-flex justify-content-center align-items-center hover-gb-grey'
                            onClick={() => handleAddTaskShow()}
                        >
                            <i className="fa-regular fa-plus"></i>
                            <p className='ms-2 mb-0'>Add New Task</p>
                        </div>
                    </div>
                </div>
            </div>

            <ModalAddTask show={addTaskShow} handleClose={handleClose} />
            <ModalEditTask show={editTaskShow} handleClose={handleClose} />
        </div>
    );
}

export default AllTask;
