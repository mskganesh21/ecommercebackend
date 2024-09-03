import express from 'express'
import { AddBannerData } from '../controller/BannerController.js'
import { BannerValidationRules, validate } from '../utils/expressvalidations.js'

const router = express.Router()

router.post('/addbanner', BannerValidationRules, validate, AddBannerData)

export default router
