import Product from '../models/ProductModel.js'
import Brand from '../models/BrandModel.js'
import Category from '../models/CategoryModel.js'
import Tags from '../models/TagsModel.js'

// Add a new product
const AddProduct = async (req, res) => {
  const { title, description, variants, category, brand, tags } = req.body

  try {
    // Get or create the category
    let categoryDoc = await Category.findOne({ name: category })
    if (!categoryDoc) {
      let newCategory = new Category({ name: category })
      await newCategory.save()
      categoryDoc = newCategory.name // Assign the name string to categoryDoc
    } else {
      categoryDoc = categoryDoc.name // Ensure you have the name string even if it exists
    }

    // Get or create the brand
    let brandDoc = await Brand.findOne({ name: brand })
    if (!brandDoc) {
      let newBrand = new Brand({ name: brand })
      await newBrand.save()
      brandDoc = newBrand.name
    } else {
      brandDoc = brandDoc.name
    }

    // Handle tags: check if each tag exists, otherwise create it
    const tagNames = await Promise.all(
      tags.map(async (tag) => {
        let tagDoc = await Tags.findOne({ name: tag })
        if (!tagDoc) {
          let newTag = new Tags({ name: tag })
          await newTag.save()
          tagDoc = newTag.name
        } else {
          tagDoc = tagDoc.name
        }
        return tagDoc
      })
    )

    // Create a new product
    const newProduct = new Product({
      title,
      description,
      variants,
      category: categoryDoc,
      brand: brandDoc,
      tags: tagNames,
    })

    const product = await newProduct.save()

    return res.status(201).json({
      error: false,
      success: true,
      data: {
        message: 'Product created successfully',
        product,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal Server Error',
      },
    })
  }
}

// Get all products
const GetAllProducts = async (req, res) => {
  const query = {}

  if (req.query.category) {
    query.category = req.query.category
  }

  if (req.query.brand) {
    query.brand = new RegExp(req.query.brand, 'i')
  }

  if (req.query.tags) {
    query.tags = new RegExp(req.query.tags, 'i')
  }

  try {
    const products = await Product.find(query, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
      'variants._id': 0,
    }).countDocuments()
    if (products) {
      return res.status(200).json({
        error: false,
        success: true,
        data: {
          products: products,
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

// Delete a product by ID
const DeleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndDelete(id)

    if (product) {
      return res.status(200).json({
        error: false,
        success: true,
        data: {
          message: 'Product deleted successfully',
          product: product,
        },
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Product not found',
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

// Update a product by ID
const UpdateProduct = async (req, res) => {
  const { id } = req.params
  const { title, description, variants } = req.body

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        variants: Array.isArray(variants) ? variants : [variants],
      },
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Product not found',
        },
      })
    }

    res.status(200).json({
      error: false,
      success: true,
      data: {
        message: 'Product updated successfully',
        product: updatedProduct,
      },
    })
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

// Get a product by ID
const GetProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (product) {
      return res.status(200).json({
        error: false,
        success: true,
        data: {
          product: product,
        },
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Product not found',
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

export { AddProduct, GetAllProducts, DeleteProduct, UpdateProduct, GetProduct }
