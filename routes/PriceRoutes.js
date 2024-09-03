import express from 'express'
import {
  AddPriceForProduct,
  GetPriceForProduct,
  UpdatePriceForProduct,
  RemovePriceForProduct,
} from '../controller/PriceController.js'
import {
  PriceValidationRules,
  validate,
  ObjectIdValidation,
} from '../utils/expressvalidations.js'

const router = express.Router()

router.post('/addprice/:id', PriceValidationRules, validate, AddPriceForProduct)
router.get('/getprice/:id', ObjectIdValidation, validate, GetPriceForProduct)
router.put(
  '/updateprice/:id',
  PriceValidationRules,
  validate,
  UpdatePriceForProduct
)
router.delete(
  '/removeprice/:id',
  ObjectIdValidation,
  validate,
  RemovePriceForProduct
)

export default router
