import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  stock: [
    {
      color: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
})

const Stock = mongoose.model('Stock', stockSchema)

export default Stock
