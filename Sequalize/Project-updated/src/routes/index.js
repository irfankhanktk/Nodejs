import express from 'express'

import * as userController from '../controllers/user.controller.js'
const router = express.Router()
import {generateAccessToken, verifyAuthToken, getUserIdFromToken, emailValidator} from '../utilities/authentication.js'

router.post('/register', emailValidator(), userController.signup)
router.post('/login', emailValidator(), userController.login)
router.post('/update', verifyAuthToken(), userController.updateUser)
router.get('/search/:term', verifyAuthToken(), userController.searchUser)
router.get('/all_users', verifyAuthToken(), userController.allUsers)

export {router}
