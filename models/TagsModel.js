import mongoose from 'mongoose'

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
})

const Tags = mongoose.model('Tags', tagsSchema)

export default Tags
