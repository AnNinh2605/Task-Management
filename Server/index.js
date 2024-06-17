import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

//import route
import userRoutes from './Router/userRoutes.js'
import taskRoutes from './Router/taskRoute.js'

import connectDB from './utils/connectDB.js'

import authMiddleware from './Middleware/AuthMiddleware.js'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,PUT,POST,DELETE,PATCH',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser())
app.use(express.static('Public'))

//route
app.use('/api', userRoutes)
app.use('/api', authMiddleware.accessTokenMiddleware, taskRoutes)

connectDB();

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})