import express from 'express'
import {
  RegisterUser,
  LoginUser,
  ReauthenticateUser,
} from '../controller/UserController.js'
import {
  RegistervalidationRules,
  LoginValidationRules,
  validate,
} from '../utils/expressvalidations.js'

const router = express.Router()

router.post('/register', RegistervalidationRules, validate, RegisterUser)
router.post('/login', LoginValidationRules, validate, LoginUser)
router.post('/refresh', ReauthenticateUser)

export default router
