import express from 'express'
import taskController from '../Controllers/taskController.js'

const router = express.Router()

router.get('/users/:_id/tasks', taskController.getUserTasks)
router.post('/tasks', taskController.createTask)

export default router