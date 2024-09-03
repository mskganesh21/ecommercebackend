import express from 'express'
import {
  AddProduct,
  GetAllProducts,
  DeleteProduct,
  UpdateProduct,
  GetProduct,
} from '../controller/ProductController.js'
import {
  ProductValidationRules,
  validate,
  ObjectIdValidation,
} from '../utils/expressvalidations.js'

const router = express.Router()

router.get('/getproduct/:id', ObjectIdValidation, validate, GetProduct)
router.post('/addproduct', ProductValidationRules, validate, AddProduct)
router.get('/getallproducts', GetAllProducts)
router.delete('/deleteproduct/:id', ObjectIdValidation, validate, DeleteProduct)
router.put(
  '/updateproduct/:id',
  ObjectIdValidation,
  ProductValidationRules,
  validate,
  UpdateProduct
)

export default router
