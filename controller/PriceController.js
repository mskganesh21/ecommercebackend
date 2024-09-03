import Price from '../models/PriceModel.js'
import { param } from 'express-validator'

const AddPriceForProduct = async (req, res) => {
  param('productId').isMongoId()
  const { productId } = req.params

  const { maxPrice, salePrice, discount } = req.body

  try {
    const newPrice = new Price({
      productId,
      maxPrice,
      salePrice,
      discount,
    })

    await newPrice.save()

    return res.status(201).json({
      error: false,
      success: true,
      data: {
        message: 'Price added successfully',
        price: newPrice,
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

const GetPriceForProduct = async (req, res) => {
  const { productId } = req.params

  try {
    const price = await Price.findOne({ productId })

    if (price) {
      return res.status(200).json({
        error: false,
        success: true,
        data: price,
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Price not found',
        },
      })
    }
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

const UpdatePriceForProduct = async (req, res) => {
  const { productId } = req.params
  const { maxPrice, salePrice, discount } = req.body

  try {
    const price = await Price.findOne({ productId })

    if (price) {
      price.maxPrice = maxPrice ?? price.maxPrice
      price.salePrice = salePrice ?? price.salePrice
      price.discount = discount ?? price.discount

      await price.save()

      return res.status(200).json({
        error: false,
        success: true,
        data: {
          message: 'Price updated successfully',
          price,
        },
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Price not found',
        },
      })
    }
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

const RemovePriceForProduct = async (req, res) => {
  const { productId } = req.params

  try {
    const price = await Price.findOneAndDelete({ productId })

    if (price) {
      return res.status(200).json({
        error: false,
        success: true,
        data: {
          message: 'Price removed successfully',
        },
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Price not found',
        },
      })
    }
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

export {
  AddPriceForProduct,
  GetPriceForProduct,
  UpdatePriceForProduct,
  RemovePriceForProduct,
}
