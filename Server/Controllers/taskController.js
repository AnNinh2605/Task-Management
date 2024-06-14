import Joi from 'joi';

import TaskModel from '../Models/TaskModel.js'
import errorHandler from '../utils/errorHandler.js';

const getUserTasks = async (req, res) => {
    const userId = req.params._id;
    
    try {
        const data = await TaskModel.find({ userId: userId });
        
        return res.status(200).json({
            status: "success",
            message: "Get all tasks successfully",
            data: data
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const createTask = async (req, res) => {
    const { name, description } = req.body;
    const taskData = req.body;

    // check input data
    const schema = Joi.object({
        name: Joi.string()
            .required(),

        description: Joi.string()
            .required(),
    })

    const { error } = schema.validate({name: name, description: description});

    if (error) {
        console.error('Validation error:', error.details[0].message);

        return res.status(400).json({
            status: "error",
            message: "Invalid input data. Please check and try again.",
        });
    }

    // Set default date if it's an empty string
    if (!taskData.date || taskData.date === '') {
        taskData.date = new Date();
    }

    try {
        await TaskModel.create(taskData);

        return res.status(201).json({
            status: "success",
            message: "Create task successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const taskController = {
    getUserTasks,
    createTask
}

export default taskController;