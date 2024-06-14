import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import './index.scss'
import axiosConfig from './Utils/axiosConfig.js'
import { store, persistor } from './Store/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
axiosConfig();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
