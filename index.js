import express from 'express'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import dotenv from 'dotenv'
import limiter from './utils/RateLimitter.js'
import cookieParser from 'cookie-parser'
import Logger from './utils/Logger.js'
import morgan from 'morgan'
import connectDB from './utils/dbConnect.js'
import passport from 'passport'
import Passport from './utils/PassportConfig.js'
import UserRoutes from './routes/UserRoutes.js'
import HomeRoutes from './routes/HomeRoutes.js'
import AuthenticateJWT from './middleware/AuthenticateJWT.js'
import LoggerMiddleware from './middleware/LoggerMiddleware.js'
import CategoryRoutes from './routes/CategoryRoutes.js'
import StockRoutes from './routes/StockRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import ReviewRoutes from './routes/ReviewsRoute.js'
import PriceRoutes from './routes/PriceRoutes.js'
import BannerRoutes from './routes/BannerRoutes.js'
import BrandRoutes from './routes/BrandRoutes.js'
import TagRoutes from './routes/TagRoutes.js'

dotenv.config()

const app = express()

app.use(helmet())

app.use(
  mongoSanitize({
    allowDots: true,
  })
)

// Define a custom token for userId
morgan.token('userId', function (req, res) {
  return req.userId || 'unknown'
})

app.use(express.json({ limit: '10mb' }))
app.use(limiter)
app.use(cors())
app.use(cookieParser())
app.disable('x-powered-by')

app.use(passport.initialize())
Passport(passport)

// Apply LoggerMiddleware globally
app.use(LoggerMiddleware)

// Use morgan for all routes
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :userId',
    {
      stream: {
        write: (message) => {
          Logger.info(message.trim())
        },
      },
    }
  )
)

app.use('/api/user', UserRoutes)
app.use('/api/private', AuthenticateJWT, HomeRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/stock', StockRoutes)
app.use('/api/product', ProductRoutes)
app.use('/api/review', ReviewRoutes)
app.use('/api/price', PriceRoutes)
app.use('/api/banner', BannerRoutes)
app.use('/api/homepage', HomeRoutes)
app.use('/api/brand', BrandRoutes)
app.use('/api/tag', TagRoutes)

const port = process.env.PORT || 3000

connectDB()

app.listen(port, () => {
  Logger.info(`Server running on port ${port}`)
})
