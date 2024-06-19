import TaskModel from '../Models/TaskModel.js'
import UserModel from '../Models/UserModel.js'
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
    let taskData = req.body;

    // check input data
    const checkValidate = validate({ name: name, description: description, userId: userId });

    if (checkValidate?.status === "error") {
        return res.status(400).json(checkValidate);
    }
    // rename data after sanitize
    const { name: nameSanitize, description: descriptionSanitize, userId: userIdSatilize } = checkValidate;

    // Set default date if it's an empty string
    if (!taskData.date || taskData.date === '') {
        taskData.date = new Date();
    }

    taskData = {
        ...taskData,
        name: nameSanitize,
        description: descriptionSanitize,
        userId: userIdSatilize
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

    const checkValidate = validate({
        name: name,
        description: description,
        date: date,
        completed: completed,
        important: important
    });

    if (checkValidate?.status === "error") {
        return res.status(400).json(checkValidate)
    }
    // rename data after sanitize
    const {
        name: nameSanitize,
        description: descriptionSanitize,
        date: dateSatilize,
        completed: completedSatilize,
        important: importantSatilize
    } = checkValidate;

    try {
        const updateTask = await TaskModel.findByIdAndUpdate(taskId,
            {
                $set: {
                    name: nameSanitize,
                    description: descriptionSanitize,
                    date: dateSatilize,
                    completed: completedSatilize,
                    important: importantSatilize
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
        // findTask to get importantStatus for updating !importantStatus
        const findTask = await TaskModel.findById(taskId);

        if (!findTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found",
            });
        }

        const importantStatus = findTask.important;

        await TaskModel.updateOne({ _id: taskId }, { $set: { important: !importantStatus } })

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
        // findTask to get completedStatus for updating !completedStatus
        const findTask = await TaskModel.findById(taskId);

        if (!findTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found",
            });
        }

        const completedStatus = findTask.completed;

        await TaskModel.updateOne({ _id: taskId }, { $set: { completed: !completedStatus } })

        return res.status(200).json({
            status: "success",
            message: "Update completed task successfully",
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const getUser = async (req, res) => {
    const _id = req.params._id;

    try {
        const data = await UserModel.findById(_id, 'username email');

        return res.status(200).json({
            status: "success",
            message: "Get user successfully",
            data: data
        });
    } catch (error) {
        return errorHandler(res, error);
    }
}

const logout = async (req, res) => {
    const userId = req.userId;

    try {
        res.clearCookie("refresh_token", { httpOnly: true, secure: true, SameSite: 'None' });

        // remove refreshToken to database
        await UserModel.updateOne(
            { _id: userId },
            { $unset: { refreshToken: "" } }
        );

        return res.status(200).json({
            status: "success",
            message: "Logout successfully",
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
    editCompletedTask,
    getUser,
    logout,
}

export default taskController;