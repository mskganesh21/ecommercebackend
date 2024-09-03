import express from 'express'
import {
  CreateCategory,
  GetAllCategories,
} from '../controller/CategoryController.js'
import {
  CategoryValidationRules,
  validate,
} from '../utils/expressvalidations.js'

const router = express.Router()

router.post(
  '/createcategory',
  CategoryValidationRules,
  validate,
  CreateCategory
)
router.get('/getallcategories', GetAllCategories)

export default router
