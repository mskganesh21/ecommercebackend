import mongoose from 'mongoose'

const priceSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
    min: 1,
  },
  salePrice: {
    type: Number,
    required: true,
    min: 1,
  },
  discount: {
    type: Number,
    required: true,
    max: 99,
  },
})

const Price = mongoose.model('Price', priceSchema)

export default Price
