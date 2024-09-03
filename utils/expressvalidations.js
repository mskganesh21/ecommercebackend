import { body, validationResult, param } from 'express-validator'

/**
 * This is a validation rule that checks if the registration route body consists of email,username and password.
 * The username must be at least 6 characters long and must contain only alphabets
 * The email must be a valid email format and must be yahoo or gmail.
 * The password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%).
 */
export const RegistervalidationRules = [
  // Email validation
  body('email')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ min: 6 })
    .withMessage('Email must be at least 6 characters long')
    .matches(/@(?:gmail\.com|yahoo\.com)$/)
    .withMessage('Email must end with @gmail.com or @yahoo.com')
    .toLowerCase(),

  // Password validation
  body('password')
    .trim()
    .exists({ checkFalsy: true }) // Ensures the field exists and is not falsy
    .withMessage('Password is required')
    .isLength({ min: 8, max: 24 })
    .withMessage('Password must be between 8 and 24 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])/)
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%)'
    ),

  // Username validation
  body('name')
    .trim()
    .exists({ checkFalsy: true }) // Ensures the field exists and is not falsy
    .withMessage('Username is required')
    .isLength({ min: 3, max: 23 })
    .withMessage('Username must be between 3 and 23 characters long')
    .matches(/^[A-Za-z]+$/)
    .withMessage('Username must contain only alphabets')
    .toLowerCase(),
]

/**
 * This is a validation rule that checks if the login route body consists of email and password.
 * The email must be a valid email format and must be yahoo or gmail.
 * The password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%).
 */
export const LoginValidationRules = [
  body('email')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ min: 6 })
    .withMessage('Email must be at least 6 characters long')
    .matches(/@(?:gmail\.com|yahoo\.com)$/)
    .withMessage('Email must end with @gmail.com or @yahoo.com')
    .toLowerCase(),

  // Password validation
  body('password')
    .trim()
    .exists({ checkFalsy: true }) // Ensures the field exists and is not falsy
    .withMessage('Password is required')
    .isLength({ min: 8, max: 24 })
    .withMessage('Password must be between 8 and 24 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])/)
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%)'
    ),
]

/**
 * This is a validation rule that checks if the product route body consists of title, description, category, brand, tags, variants, and images.
 * The title field must be a non-empty string.
 * The description field must be a non-empty string.
 * The category field must be a non-empty string.
 * The brand field must be a non-empty string.
 * The tags field must be an array of non-empty strings.
 * The variants field must be an array of objects with color, images, and sizes fields.
 * The color field must be a non-empty string.
 * The images field must be an array of non-empty strings.
 * The sizes field must be an array of non-empty strings.
 */
export const ProductValidationRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .toLowerCase(),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .toLowerCase(),

  body('category').notEmpty().withMessage('Category is required').toLowerCase(),

  body('brand').notEmpty().withMessage('Brand is required').toLowerCase(),

  body('tags')
    .isArray({ min: 1 })
    .withMessage('At least one tag is required')
    .toLowerCase(),

  body('variants')
    .isArray({ min: 1 })
    .withMessage('At least one variant is required'),

  body('variants.*.color')
    .trim()
    .notEmpty()
    .withMessage('Color is required for each variant')
    .toLowerCase(),

  body('variants.*.images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required for each variant'),

  body('variants.*.sizes')
    .isArray({ min: 1 })
    .withMessage('At least one size is required for each variant')
    .toLowerCase(),
]

/**
 * This is a validation rule that checks if the category route body consists of name field.
 * The name field must be a non-empty string.
 */
export const CategoryValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .toLowerCase()
    .matches(/^\S+$/)
    .withMessage('Name must be a single word (no spaces)'),
]

/**
 * This is a validation rule that checks if the stock route body consists of stock field.
 * The stock field must be an array of objects with color, size, and quantity fields.
 * The color field must be a non-empty string.
 * The size field must be a non-empty string.
 * The quantity field must be a number.
 */
export const StockValidationRules = [
  body('stock')
    .isArray({ min: 1 })
    .withMessage('At least one stock is required'),
  body('stock.*.color')
    .trim()
    .notEmpty()
    .withMessage('Color is required')
    .toLowerCase(),
  body('stock.*.size')
    .trim()
    .notEmpty()
    .withMessage('Size is required')
    .toLowerCase(),
  body('stock.*.quantity')
    .trim()
    .isNumeric()
    .notEmpty()
    .withMessage('Quantity is required')
    .toLowerCase(),
]

/**
 * This is a validation rule that checks if the banner route body consists of title field, description field, and image field.
 * The title field must be a non-empty string.
 * The description field must be a non-empty string.
 * The image field must be a non-empty string.
 */
export const BannerValidationRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .toLowerCase(),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .toLowerCase(),
  body('image').trim().notEmpty().withMessage('Image is required'),
]

/**
 * This is a validation rule that checks if the price route body consists of maxPrice field, salePrice field, and discount field.
 * The maxPrice field must be a number greater than or equal to 1.
 * The salePrice field must be a number greater than or equal to 1.
 * The salePrice field must be less than or equal to the maxPrice field.
 * The discount field must be a number less than or equal to 99.
 */
export const PriceValidationRules = [
  body('maxPrice')
    .trim()
    .isNumeric()
    .notEmpty()
    .withMessage('Max Price is required')
    .isFloat({ min: 1 })
    .withMessage('Max Price must be at least 1'),

  body('salePrice')
    .trim()
    .isNumeric()
    .notEmpty()
    .withMessage('Sale Price is required')
    .isFloat({ min: 1 })
    .withMessage('Sale Price must be at least 1')
    .custom((value, { req }) => {
      if (parseFloat(value) >= parseFloat(req.body.maxPrice)) {
        throw new Error('Sale Price must be less than Max Price')
      }
      return true
    }),

  body('discount')
    .trim()
    .isNumeric()
    .notEmpty()
    .withMessage('Discount is required')
    .isFloat({ max: 99 })
    .withMessage('Discount cannot exceed 99'),
]

/**
 * This is a validation rule that checks if the reviews route body consists of rating field and description field.
 * the Rating field should be a number with min value of 1 and max value of 5.
 * the Description field is a string and should not be empty.
 */
export const ReviewsValidationRules = [
  body('rating')
    .trim()
    .isNumeric()
    .notEmpty()
    .withMessage('Rating is required')
    .isFloat({ max: 5 })
    .withMessage('Rating cannot exceed 5'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .toLowerCase(),
]

/**
 * This is a validation rule that checks if the ID is a valid MongoDB ID and if it exists in the request param.
 */
export const ObjectIdValidation = [
  param('id').isMongoId().withMessage('Invalid ID format'),
]

/**
 *
 * @param {httpRequest} req
 * @param {httpResponse} res
 * @param {calling the next function} next
 * @returns if all the validation passes then it will call the next function else it will return the error
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: true,
      success: false,
      data: { errors: errors.array() },
    })
  }
  next()
}
