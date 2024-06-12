import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './ModalStyle.scss'

const ModalAddTask = ({ show, handleClose }) => {
    const handleAddTask = () => {
        alert("Add task okok");
    }
    
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}
            onSubmit={() => handleAddTask()}
        >
            <Modal.Header closeButton className='bg-main text-white'>
                <Modal.Title>Create Task</Modal.Title>
            </Modal.Header>

            <Modal.Body className='bg-main text-white'>
                <Form>
                    <Form.Group className="mb-3" controlId="taskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Task name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>

                    <Form.Group
                        className="mb-3 d-flex justify-content-between"
                        controlId="completed"
                    >
                        <label htmlFor="completed">Completed Task</label>
                        <input type="checkbox" id='completed' />
                    </Form.Group>

                    <Form.Group
                        className="mb-3 d-flex justify-content-between"
                        controlId="important"
                    >
                        <label htmlFor="important">Important Task</label>
                        <input type="checkbox" id='important' />
                    </Form.Group>

                    <Form.Group className='d-flex justify-content-end gap-2'>
                        <Button variant="secondary" onClick={handleClose}>
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
