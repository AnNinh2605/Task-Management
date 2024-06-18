import axios from 'axios'

const registerService = (data) => {
    return axios.post('/register', data);
}

const loginService = (data) => {
    return axios.post('/login', data);
}

const refreshTokenService = () => {
    return axios.post('/refresh-token');
}

const forgotPasswordService = (email) => {
    return axios.post('/password/forgot', email);
}

const resetPasswordService = (password, resetToken) => {
    return axios.post('/password/reset', { password: password, resetToken: resetToken });
}

const userService = {
    registerService,
    loginService,
    refreshTokenService,
    forgotPasswordService,
    resetPasswordService
}

export default userService; 