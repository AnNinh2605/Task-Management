import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import userReducer from './reducers/userReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: persistReducer(persistConfig, userReducer)
});

export default rootReducer;