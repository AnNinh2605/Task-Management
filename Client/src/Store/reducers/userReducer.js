const initialState = {
    isLogin: false,
    userId: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const newState = {
                ...state,
                isLogin: true,
                userId: action.payload
            }
            return newState;
        default:
            return state;
    }
};

export default userReducer;