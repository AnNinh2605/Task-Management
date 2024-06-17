import express from 'express'
import taskController from '../Controllers/taskController.js'

const router = express.Router()

router.get('/users/:_id/tasks', taskController.getUserTasks)

router.post('/tasks', taskController.createTask)

router.delete('/tasks/:_id', taskController.deleteTask)

router.put('/tasks/:_id', taskController.editTask)

router.patch('/tasks/:_id/completed', taskController.editCompletedTask)
router.patch('/tasks/:_id/important', taskController.editImportantTask)

export default router