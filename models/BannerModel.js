import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  brands: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
  ],
  analytics: [
    {
      title: {
        type: String,
        required: true,
      },
      Nos: {
        type: Number,
        required: true,
      },
    },
  ],
})

const Banner = mongoose.model('Banner', bannerSchema)

export default Banner
