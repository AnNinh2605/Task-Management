import TaskModel from '../Models/TaskModel.js'
import errorHandler from '../utils/errorHandler.js';
import validate from '../utils/validation.js';

const getUserTasks = async (req, res) => {
    const userId = req.params._id;
    const status = req.query.status;

    // condition query
    let conditionQuery = { userId: userId };
    if (status === "processing") {
        conditionQuery.completed = false;
    }
    else if (status === "completed") {
        conditionQuery.completed = true;
    }
    else if (status === "important") (
        conditionQuery.important = true
    )

    try {
        const data = await TaskModel.find(conditionQuery);

        return res.status(200).json({
            status: "success",
            message: "Get tasks successfully",
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
        const updateTask = await TaskModel.findByIdAndUpdate(taskId,
            {
                $set: {
                    name: name,
                    description: description,
                    date: date,
                    completed: completed,
                    important: important
                }
            });

        if (!updateTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found",
            });
        }

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
        const deleteTask = await TaskModel.findByIdAndDelete(taskId);

        if (!deleteTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Delete task successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const editImportantTask = async (req, res) => {
    const taskId = req.params._id;

    try {
        const findTask = await TaskModel.findById(taskId);

        if (!findTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found",
            });
        }

        const importantStatus = findTask.important;

        await TaskModel.findByIdAndUpdate(taskId, { $set: { important: !importantStatus } })

        return res.status(200).json({
            status: "success",
            message: "Update important task successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const editCompletedTask = async (req, res) => {
    const taskId = req.params._id;

    try {
        const findTask = await TaskModel.findById(taskId);

        if (!findTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found",
            });
        }

        const completed = findTask.completed;

        await TaskModel.findByIdAndUpdate(taskId, { $set: { completed: !completed } })

        return res.status(200).json({
            status: "success",
            message: "Update completed task successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const taskController = {
    getUserTasks,
    createTask,
    editTask,
    deleteTask,
    editImportantTask,
    editCompletedTask
}

export default taskController;