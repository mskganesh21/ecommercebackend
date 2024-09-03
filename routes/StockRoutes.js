import express from 'express'
import {
  GetStockOfAProduct,
  AddStockOfAProduct,
  RemoveStockOfAProduct,
  UpdateStockOfAProduct,
  GetStockOfAllProducts,
} from '../controller/StockController.js'
import {
  StockValidationRules,
  validate,
  ObjectIdValidation,
} from '../utils/expressvalidations.js'

const router = express.Router()

router.get('/getstock/:id', ObjectIdValidation, validate, GetStockOfAProduct)
router.post(
  '/addstock/:id',
  ObjectIdValidation,
  StockValidationRules,
  validate,
  AddStockOfAProduct
)
router.delete(
  '/removestock/:id',
  ObjectIdValidation,
  validate,
  RemoveStockOfAProduct
)
router.put(
  '/updatestock/:id',
  ObjectIdValidation,
  StockValidationRules,
  validate,
  UpdateStockOfAProduct
)
router.get('/getallstock', GetStockOfAllProducts)

export default router
