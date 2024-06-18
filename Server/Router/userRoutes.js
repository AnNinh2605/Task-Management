import express from 'express'
import Controller from '../Controllers/userController.js'

const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/password/forgot', Controller.forgotPassword)
router.post('/password/reset', Controller.resetPassword)

router.post('/refresh-token', Controller.refreshToken);

export default router
