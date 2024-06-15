import TaskModel from '../Models/TaskModel.js'
import errorHandler from '../utils/errorHandler.js';
import validate from '../utils/validation.js';

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
    const { name, description, userId } = req.body;
    const taskData = req.body;

    // check input data
    const validationResult = validate({ name: name, description: description, userId: userId });

    if (validationResult?.error) {
        return res.status(400).json({
            status: "error",
            message: validationResult.error
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

const editTask = async (req, res) => {
    const taskId = req.params._id;
    const { name, description, date, completed, important } = req.body;
    
    const validationResult = validate({
        name: name,
        description: description,
        date: date,
        completed: completed,
        important: important
    });

    if (validationResult?.error) {
        return res.status(400).json({
            status: "error",
            message: validationResult.error
        })
    }

    try {
        await TaskModel.findByIdAndUpdate(taskId,
            {
                name: name,
                description: description,
                date: date,
                completed: completed,
                important: important
            });

        return res.status(200).json({
            status: "success",
            message: "Update task successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const deleteTask = async (req, res) => {
    const taskId = req.params._id;

    try {
        await TaskModel.findByIdAndDelete(taskId);
        
        return res.status(200).json({
            status: "success",
            message: "Delete task successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const taskController = {
    getUserTasks,
    createTask,
    editTask,
    deleteTask
}

export default taskController;