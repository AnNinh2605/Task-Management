import axios from "axios";

const getUserTasksService = (userId) => {
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

const getUserService = (_id) => {
    return axios.get(`/users/${_id}`);
}

const getTasksDataService = (userId, status) => {
    return axios.get(`/users/${userId}/tasks?status=${status}`)
}

const toggleImportantStatusService = (taskId) => {
    return axios.patch(`/tasks/${taskId}/important`)
}

const toggleCompletedStatusService = (taskId) => {
    return axios.patch(`/tasks/${taskId}/completed`)
}

const logoutService = () => {
    return axios.post('/logout')
}

const taskService = {
    getUserTasksService,
    createTaskService,
    getTaskService,
    editTaskService,
    deleteTaskService,
    getTasksDataService,
    toggleImportantStatusService,
    toggleCompletedStatusService,
    getUserService,
    logoutService
}

export default taskService;