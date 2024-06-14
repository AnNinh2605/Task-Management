import axios from 'axios'

const registerService = (data) => {
    return axios.post('/register', data);
}

const loginService = (data) => {
    return axios.post('/login', data);
}

const getUserService = (_id) => {
    return axios.get(`/user/${_id}`);
}

const userService = {
    registerService,
    loginService,
    getUserService
}
export default userService; 