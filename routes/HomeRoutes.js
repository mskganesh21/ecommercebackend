import express from 'express'
import { PrivateHomeRoute } from '../controller/HomeController.js'
const router = express.Router()

router.get('/home', PrivateHomeRoute)

export default router
