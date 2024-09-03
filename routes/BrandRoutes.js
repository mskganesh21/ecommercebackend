import express from 'express'
import { CreateBrand, GetAllBrands } from '../controller/BrandController.js'

const router = express.Router()

router.post('/createbrand', CreateBrand)
router.get('/getallbrands', GetAllBrands)

export default router
