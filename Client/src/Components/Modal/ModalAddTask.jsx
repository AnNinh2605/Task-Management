import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import './ModalStyle.scss'
import validate from '../../Utils/validateInput';
import taskService from '../../Services/taskService';

const ModalAddTask = (props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const noSpaceValidate = validate.noSpaceValidate;

    const userId = useSelector(state => state.user.userId);

    const handleAddTask = async (data) => {
        // Clean input data
        const fieldsToTrim = ['name', 'description', 'date'];
        for (const item in data) {
            if (fieldsToTrim.includes(item)) {
                data[item] = data[item].trim();
            }
        }

        const taskData = { ...data, userId: userId }

        try {
            const responseServer = await taskService.createTaskService(taskData);

            toast.success(responseServer.data.message);
            props.onEmployeeAdded();
            reset();
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }
    }

    // Function to close the modal and reset all form input fields
    const handleClodeModal = () => {
        props.handleClose();
        reset();
    }

    return (
        <Modal show={props.show} onHide={handleClodeModal} backdrop="static" keyboard={false}
            onSubmit={handleSubmit(handleAddTask)}
        >
            <Modal.Header closeButton className='bg-main text-white'>
                <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>

            <Modal.Body className='bg-main text-white'>
                <Form>
                    <Form.Group className="mb-3" controlId="taskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Task name"
                            {...register("name",
                                {
                                    required: 'This field is required',
                                    validate: noSpaceValidate
                                }
                            )}
                        />
                        {errors.name && <small className='text-warning'>{errors.name.message}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description"
                            {...register("description",
                                {
                                    required: 'This field is required',
                                    validate: noSpaceValidate
                                }
                            )}
                        />
                        {errors.description && <small className='text-warning'>{errors.description.message}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"
                            {...register("date")} />
                    </Form.Group>

                    <Form.Group
                        className="mb-3 d-flex justify-content-between"
                        controlId="completed"
                    >
                        <label htmlFor="completed">Completed Task</label>
                        <input type="checkbox" id='completed'
                            {...register("completed")}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3 d-flex justify-content-between"
                        controlId="important"
                    >
                        <label htmlFor="important">Important Task</label>
                        <input type="checkbox" id='important'
                            {...register("important")}
                        />
                    </Form.Group>

                    <Form.Group className='d-flex justify-content-end gap-2'>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            <i className="fa-solid fa-plus me-2"></i>
                            Create Task
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddTask;
