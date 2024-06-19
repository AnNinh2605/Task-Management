import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './TaskComponentStyle.scss'
import ModalAddTask from '../Modal/ModalAddTask';
import ModalEditTask from '../Modal/ModalEditTask'
import taskService from '../../Services/taskService';
import utilities from '../../Utils/utilities';

const TaskComponent = (componentName, componentTask) => {
    const userId = useSelector(state => state.user.userId);

    const defaultShowModal = {
        addTask: false,
        editTask: false,
    }
    const [showModal, setShowModal] = useState(defaultShowModal);

    const [taskCard, setTaskCard] = useState([]);
    const [dataEditModal, setDataEditModal] = useState({});

    // function to set show modal
    const toggleShowModal = (name) => {
        setShowModal(prevStatus => ({ ...prevStatus, [name]: true }));
    }

    // function to close modal
    const handleCloseModal = () => {
        setShowModal(defaultShowModal);
    }

    // function to close modal and reload task data 
    const closeModalAndReload = () => {
        handleCloseModal();
        getTasksData();
    }

    // function to show edit modal and send data to edit modal
    const editModal = (dataModal) => {
        toggleShowModal("editTask");
        setDataEditModal(dataModal);
    }

    const handleDeleteTask = async (_id, name) => {
        const isDeleteTask = window.confirm(`Are you sure you want to delete ${name} task?`);

        if (isDeleteTask) {
            try {
                const responseServer = await taskService.deleteTaskService(_id);

                toast.success(responseServer.data.message);
                getTasksData();
            } catch (error) {
                const errorMS = error?.response?.data?.message || 'An error occurred';
                toast.error(errorMS);
            }
        }
    }

    const getTasksData = async () => {
        try {
            const responseServer = await taskService.getTasksDataService(userId, componentTask);

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

    // function to toggle the important status of a task
    const toggleImportantStatus = async (taskId) => {
        try {
            const responseServer = await taskService.toggleImportantStatusService(taskId);

            getTasksData();
            toast.success(responseServer.data.message);
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }
    }

    // function to toggle the completed status of a task
    const toggleCompletedStatus = async (taskId) => {
        try {
            const responseServer = await taskService.toggleCompletedStatusService(taskId);

            getTasksData();
            toast.success(responseServer.data.message);
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }
    }

    useEffect(() => {
        getTasksData();
    }, [])

    return (
        <div className='col border p-3 rounded-4 border-secondary bg-main text-white'>
            <h4 className='mb-2 pb-1 border-bottom border-3 d-inline-block'>{componentName}</h4>

            <div className="container-fluid">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                    {taskCard.map((item, index) => {
                        return (
                            <div key={`taskCard-${index}`}
                                className='border rounded-4 border-secondary bg-taskCard p-3 d-flex flex-column justify-content-between hover-zoom'
                                >
                                <h5>{item.name}</h5>
                                <small className='mb-2 truncate-2-lines'>{item.description}</small>
                                <small className='mb-2'>{item.date}</small>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <button
                                        className={item.completed ?
                                            "btn btn-sm btn-success rounded-pill" :
                                            "btn btn-sm btn-danger rounded-pill"}
                                        onClick={() => toggleCompletedStatus(item._id)}
                                    >
                                        {item.completed ? 'Completed' : 'Incomplete'}
                                    </button>
                                    <div role="button">
                                        <i
                                            className={item.important ?
                                                "fa-solid fa-star text-warning" : "fa-solid fa-star"}
                                            title='Important task'
                                            onClick={() => toggleImportantStatus(item._id)}
                                        ></i>
                                        <i className="ms-3 fa-solid fa-file-pen" title='Edit task'
                                            onClick={() => editModal(item)}>
                                        </i>
                                        <i className="ms-3 fa-solid fa-trash" title='Delete task'
                                            onClick={() => handleDeleteTask(item._id, item.name)}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <div
                        className='border-dashed rounded-4 border-secondary p-3 fs-6 d-flex justify-content-center align-items-center hover-gb-grey' style={{"height": "10rem"}}
                        onClick={() => toggleShowModal("addTask")}
                    >
                        <i className="fa-regular fa-plus"></i>
                        <p className='ms-2 mb-0'>Add New Task</p>
                    </div>
                </div>
            </div>

            <ModalAddTask
                show={showModal.addTask}
                handleClose={handleCloseModal}
                onTaskAdded={closeModalAndReload}
            />
            <ModalEditTask
                show={showModal.editTask}
                handleClose={handleCloseModal}
                onTaskEdit={closeModalAndReload}
                dataEdit={dataEditModal}
            />
        </div>
    );
}

export default TaskComponent;
