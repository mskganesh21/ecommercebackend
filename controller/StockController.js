import Stock from '../models/StockModel.js'

const GetStockOfAProduct = async (req, res) => {
  const { id } = req.params

  try {
    const stock = await Stock.findOne(
      { productId: id },
      {
        _id: 0,
        __v: 0,
        productId: 0,
        'stock._id': 0,
        createdAt: 0,
        updatedAt: 0,
      }
    )
    if (stock) {
      return res.status(200).json({
        error: false,
        success: true,
        data: stock,
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Stock not found for the given product ID',
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

const AddStockOfAProduct = async (req, res) => {
  const { id } = req.params
  const { stockItems } = req.body // stockItems is an array of objects [{color, size, quantity}, ...]

  try {
    let stock = await Stock.findOne({ productId: id })

    if (stock) {
      // Update existing stock
      stockItems.forEach((newStockItem) => {
        const existingStock = stock.stock.find(
          (item) =>
            item.color === newStockItem.color && item.size === newStockItem.size
        )

        if (existingStock) {
          existingStock.quantity += newStockItem.quantity
        } else {
          stock.stock.push(newStockItem)
        }
      })
    } else {
      // Create new stock
      stock = new Stock({
        productId: id,
        stock: stockItems,
      })
    }

    await stock.save()

    return res.status(200).json({
      error: false,
      success: true,
      data: {
        message: 'Stock added/updated successfully',
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

const RemoveStockOfAProduct = async (req, res) => {
  const { id } = req.params
  const { color, size } = req.body

  try {
    const stock = await Stock.findOne({ productId: id })

    if (stock) {
      const stockIndex = stock.stock.findIndex(
        (item) => item.color === color && item.size === size
      )

      if (stockIndex > -1) {
        stock.stock.splice(stockIndex, 1)
        await stock.save()
        return res.status(200).json({
          error: false,
          success: true,
          data: {
            message: 'Stock removed successfully',
          },
        })
      } else {
        return res.status(404).json({
          error: true,
          success: false,
          data: {
            message: 'Stock not found for the specified color and size',
          },
        })
      }
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Stock not found for the given product ID',
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

const UpdateStockOfAProduct = async (req, res) => {
  const { id } = req.params
  const { stockItems } = req.body // stockItems is an array of objects [{color, size, quantity}, ...]

  try {
    const stock = await Stock.findOne({ productId: id })

    if (stock) {
      stockItems.forEach((updatedStockItem) => {
        const existingStock = stock.stock.find(
          (item) =>
            item.color === updatedStockItem.color &&
            item.size === updatedStockItem.size
        )

        if (existingStock) {
          existingStock.quantity = updatedStockItem.quantity
        } else {
          stock.stock.push(updatedStockItem)
        }
      })

      await stock.save()
      return res.status(200).json({
        error: false,
        success: true,
        data: {
          message: 'Stock updated successfully',
        },
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Stock not found for the given product ID',
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

const GetStockOfAllProducts = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('productId')
    return res.status(200).json({
      error: false,
      success: true,
      data: stocks,
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

export {
  GetStockOfAProduct,
  AddStockOfAProduct,
  RemoveStockOfAProduct,
  UpdateStockOfAProduct,
  GetStockOfAllProducts,
}
