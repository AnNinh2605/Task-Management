import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import './ModalStyle.scss'
import taskService from '../../Services/taskService';
import validate from '../../Utils/validateInput';

const ModalEditTask = (props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const noSpaceValidate = validate.noSpaceValidate;

    const taskId = props.dataEdit._id;

    const handleEditTask = async (data) => {
        // sanitize input data
        const fieldsToTrim = ['name', 'description'];
        for (const item in data) {
            if (fieldsToTrim.includes(item)) {
                data[item] = data[item].trim();
            }
        }
        
        try {
            const responseServer = await taskService.editTaskService(taskId, data);

            toast.success(responseServer.data.message);
            props.onTaskEdit();
            reset();
        } catch (error) {
            const errorMS = error?.response?.data?.message || 'An error occurred';
            toast.error(errorMS);
        }
    }

    useEffect(() => {
        let dataModal = props.dataEdit;
        
        if(dataModal){
            const parts = dataModal.date?.split('-');
            
            if(parts){
                const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                dataModal = { ...dataModal, date: formattedDate }
            }
        
            reset(dataModal);
        }
    }, [props.dataEdit])

    return (
        <Modal show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            onSubmit={handleSubmit(handleEditTask)}
        >
            <Modal.Header closeButton className='bg-main text-white'>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>

            <Modal.Body className='bg-main text-white'>
                <Form>
                    <Form.Group className="mb-2" controlId="taskName">
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

                    <Form.Group className="mb-2" controlId="description">
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

                    <Form.Group className="mb-2" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" 
                        {...register("date")}
                        />
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
                        className="mb-2 d-flex justify-content-between"
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
                            Save Change
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEditTask;
