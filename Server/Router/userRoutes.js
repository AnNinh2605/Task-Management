import express from 'express'
import Controller from '../Controllers/userController.js'

const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/logout', Controller.logout)
router.get('/user/:_id', Controller.getUser)

export default router
