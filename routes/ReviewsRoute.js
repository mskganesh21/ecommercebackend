import express from 'express'
import {
  AddReviewOfAProduct,
  GetReviewsOfAProduct,
  UpdateReviewOfAProduct,
  RemoveReviewOfAProduct,
} from '../controller/ReviewsController.js'
import {
  ObjectIdValidation,
  validate,
  ReviewsValidationRules,
} from '../utils/expressvalidations.js'

const router = express.Router()

router.post(
  '/addreview/:id',
  ObjectIdValidation,
  ReviewsValidationRules,
  validate,
  AddReviewOfAProduct
)
router.get(
  '/getreviews/:id',
  ObjectIdValidation,
  validate,
  GetReviewsOfAProduct
)
router.put(
  '/updatereview/:id',
  ObjectIdValidation,
  ReviewsValidationRules,
  validate,
  UpdateReviewOfAProduct
)
router.delete(
  '/removereview/:id',
  ObjectIdValidation,
  validate,
  RemoveReviewOfAProduct
)

export default router
