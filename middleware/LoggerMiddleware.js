import Logger from '../utils/Logger.js'

const LoggerMiddleware = (req, res, next) => {
  req.userId = 'anonymous'
  next()
}

export default LoggerMiddleware
