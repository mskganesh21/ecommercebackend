import passport from 'passport'
import Logger from '../utils/Logger.js'
import jwt from 'jsonwebtoken'

const AuthenticateJWT = (req, res, next) => {
  console.log('AuthenticateJWT middleware called')

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log('Passport authenticate callback triggered')
    console.log('Error:', err)
    console.log('User:', user)
    console.log('Info:', info)

    if (err) {
      Logger.error('Authentication error', { userId: 'unknown', error: err })
      return res.status(500).json({
        error: true,
        success: false,
        data: {
          message: err.message,
        },
      })
    }

    if (!user) {
      Logger.warn('Unauthorized access attempt', {
        userId: 'anonymous',
        info: info,
      })
      return res.status(401).json({
        error: true,
        success: false,
        data: {
          message: info?.message || 'Unauthorized access',
        },
      })
    }

    // Manually verify token expiration
    const token = req.headers.authorization.split(' ')[1]
    console.log('Token:', token)

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      console.log('Decoded token:', decoded)

      const currentTimestamp = Math.floor(Date.now() / 1000)
      console.log('Current timestamp:', currentTimestamp)
      console.log('Token expiration:', decoded.exp)

      if (decoded.exp && decoded.exp < currentTimestamp) {
        console.log('Token has expired')
        Logger.warn('Expired token used', { userId: 'anonymous' })
        return res.status(401).json({
          error: true,
          success: false,
          data: {
            message: 'Token has expired',
          },
        })
      }
    } catch (error) {
      console.log('Token verification failed:', error)
      Logger.error('Token verification failed', {
        userId: 'unknown',
        error: error,
      })
      return res.status(401).json({
        error: true,
        success: false,
        data: {
          message: 'Invalid token',
        },
      })
    }

    req.user = user
    req.userId = user.id
    Logger.info('User authenticated', { userId: user.id })
    next()
  })(req, res, next)
}

export default AuthenticateJWT
