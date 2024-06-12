import React from 'react';

const CompletedTask = () => {
    const taskCard = [
    ]
    
    return (
        <div className='col p-4 rounded-4 border border-secondary bg-main'>
        <h4 className='mb-3 pb-1 border-bottom border-3 d-inline-block'>Completed Tasks</h4>

        <div className="container-fluid px-0">
            <div className="row">
                <div className='d-flex flex-wrap gap-4'>
                    {taskCard.map((item, index) => {
                        return (
                            <div className='col-3 border rounded-4 border-secondary bg-taskCard p-3 d-flex flex-column'>
                                <h5>{item.taskName}</h5>
                                <small className='mb-2'>{item.discription}</small>
                                <small className='mb-2'>{item.date}</small>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <button className='btn btn-sm btn-success rounded-pill'>{item.status}</button>
                                    <div>
                                        <i className="fa-solid fa-file-pen"
                                            onClick={() => navigate('/editTask')}>
                                        </i>
                                        <i className="ms-2 fa-solid fa-trash"></i>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
    );
}

export default CompletedTask;
