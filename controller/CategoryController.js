import Category from '../models/CategoryModel.js'

import addIdsToArray from '../utils/addIdsToArray.js'

const CreateCategory = async (req, res) => {
  const { name } = req.body
  console.log(name, 'ccc')

  try {
    const existing = await Category.findOne({ name })
    if (existing) {
      return res.status(409).json({
        error: true,
        success: false,
        data: {
          message: 'Category already exists',
        },
      })
    }

    const newCategory = new Category({ name })
    const category = await newCategory.save()
    if (category) {
      return res.status(201).json({
        error: false,
        success: true,
        data: {
          message: 'Category created successfully',
        },
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal Server Error',
      },
    })
  }
}

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { name: 1, _id: 0 })
    if (categories) {
      // Use the utility function to add IDs
      const CategoriesArray = addIdsToArray(
        categories.map((category) => ({
          name: category.name,
        }))
      )

      return res.status(200).json({
        error: false,
        success: true,
        data: {
          categories: CategoriesArray,
        },
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal Server Error',
      },
    })
  }
}

export { CreateCategory, GetAllCategories }
