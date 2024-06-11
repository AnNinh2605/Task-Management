import React from 'react';

const AddTask = () => {
    return (
        <div className='d-flex justify-content-center vh-100 align-items-center'>
            <div className='col-4 border rounded-4 p-4 bg-secondary text-white'>
                <h5>Create a Task</h5>
                <form className='d-flex flex-column gap-3'>
                    <div className='form-group'>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id='title'
                            className='form-control'
                            placeholder='Title'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            className='form-control'
                            rows="3"
                            placeholder='Description'
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id='date'
                            className='form-control'
                        />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <label htmlFor="completed">Completed Task</label>
                        <input type="checkbox" id='completed' />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <label htmlFor="important">Important Task</label>
                        <input type="checkbox" id='important' />
                    </div>
                </form>
                <div className='d-flex justify-content-end'>
                <button type='submit' className='btn btn-primary mt-2 rounded-3 px-3'>
                    <i className="fa-solid fa-plus me-2"></i>
                    Create Task
                </button>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
