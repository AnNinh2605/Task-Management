import axios from "axios";

const getUserTasks = (userId) => {
    return axios.get(`/users/${userId}/tasks`)
}

const createTaskService = (taskData) => {
    return axios.post('/tasks', taskData);
}

const taskService = {
    getUserTasks,
    createTaskService
}

export default taskService;