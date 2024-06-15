import axios from "axios";

const getUserTasks = (userId) => {
    return axios.get(`/users/${userId}/tasks`)
}

const createTaskService = (taskData) => {
    return axios.post('/tasks', taskData);
}

const getTaskService = (taskId) => {
    return axios.get(`/tasks/${taskId}`);
}

const editTaskService = (taskId, taskData) => {
    return axios.put(`/tasks/${taskId}`, taskData);
}

const deleteTaskService = (taskId) => {
    return axios.delete(`/tasks/${taskId}`);
}

const taskService = {
    getUserTasks,
    createTaskService,
    getTaskService,
    editTaskService,
    deleteTaskService
}

export default taskService;