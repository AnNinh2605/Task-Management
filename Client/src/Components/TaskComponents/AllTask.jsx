import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './TaskComponentStyle.scss'
import ModalAddTask from '../Modal/ModalAddTask';
import ModalEditTask from '../Modal/ModalEditTask'
import taskService from '../../Services/taskService';
import utilities from '../../Utils/utilities';

const AllTask = () => {
    const userId = useSelector(state => state.user.userId);

    const defaultShow = {
        addTask: false,
        editTask: false,
    }

    const [show, setShow] = useState(defaultShow);
    const [taskCard, setTaskCard] = useState([]);
    
    // for show modal
    const toggleShowModal = (name) => {
        setShow(prevStatus => ({ ...prevStatus, [name]: true }));
    }
    // for close modal
    const handleCloseModal = () => {
        setShow(defaultShow);
    }

    const handleDeleteTask = () => {
        alert("Delete task okok");
    }

    const getUserTasks = async () => {
        try {
            const responseServer = await taskService.getUserTasks(userId);

            const serverData = responseServer.data.data;

            const taskData = serverData.map(item => {
                return { ...item, date: utilities.formatDateTo_ddmmyyyy(item.date) }
            })

            setTaskCard(taskData);
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }
    }

    // Callback function to update tasks after adding a new employee
    const handleEmployeeAdded = () => {
        handleCloseModal(); // Close the modal after adding employee
        getUserTasks();
    };

    useEffect(() => {
        getUserTasks();
    }, [])

    return (
        <div className='col p-4 rounded-4 border border-secondary bg-main'>
            <h4 className='mb-3 pb-1 border-bottom border-3 d-inline-block'>All Tasks</h4>

            <div className="container-fluid px-0">
                <div className="row">
                    <div className='d-flex flex-wrap gap-4'>
                        {taskCard.map((item, index) => {
                            return (
                                <div key={`taskCard-${index}`}
                                    className='col-12 col-md-6 col-lg-3 border rounded-4 border-secondary bg-taskCard p-3 d-flex flex-column'>
                                    <h5>{item.name}</h5>
                                    <small className='mb-2'>{item.description}</small>
                                    <small className='mb-2'>{item.date}</small>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        {item.completed ?
                                            <button className='btn btn-sm btn-success rounded-pill'>
                                                Completed
                                            </button> :
                                            <button className='btn btn-sm btn-danger rounded-pill'>
                                                Uncompleted
                                            </button>
                                        }
                                        <div role="button">
                                            <i className="fa-solid fa-file-pen" title='Edit task'
                                                onClick={() => toggleShowModal("editTask")}>
                                            </i>
                                            <i className="ms-3 fa-solid fa-trash" title='Delete task'
                                                onClick={() => handleDeleteTask()}
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div
                            className='col-12 col-md-6 col-lg-3 border-dashed rounded-4 border-secondary p-3 fs-6 d-flex justify-content-center align-items-center hover-gb-grey '
                            onClick={() => toggleShowModal("addTask")}
                        >
                            <i className="fa-regular fa-plus"></i>
                            <p className='ms-2 mb-0'>Add New Task</p>
                        </div>
                    </div>
                </div>
            </div>

            <ModalAddTask
                show={show.addTask}
                handleClose={handleCloseModal}
                onEmployeeAdded={handleEmployeeAdded}
            />
            <ModalEditTask show={show.editTask} handleClose={handleCloseModal} />
        </div>
    );
}

export default AllTask;
