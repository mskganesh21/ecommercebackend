import mongoose from 'mongoose'
import Logger from './Logger.js'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    Logger.info('MongoDB connected')
  } catch (error) {
    Logger.info('MongoDB connection Fail')
    process.exit(1)
  }
}

export default connectDB
