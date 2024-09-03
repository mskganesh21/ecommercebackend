import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/UserModel.js'
import dotenv from 'dotenv'

dotenv.config()

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  ignoreExpiration: false,
}

const Passport = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      console.log('JwtStrategy callback triggered')
      console.log('JWT payload:', jwt_payload)

      try {
        // Check if the token has expired
        const currentTimestamp = Math.floor(Date.now() / 1000)
        console.log('Current timestamp:', currentTimestamp)
        console.log('Token expiration:', jwt_payload.exp)

        if (jwt_payload.exp && jwt_payload.exp < currentTimestamp) {
          console.log('Token has expired in Passport strategy')
          return done(null, false, { message: 'Token has expired' })
        }

        const user = await User.findById(jwt_payload.jwt)
        if (user) {
          console.log('User found:', user.id)
          return done(null, user)
        } else {
          console.log('User not found')
          return done(null, false, { message: 'User not found' })
        }
      } catch (err) {
        console.log('Error in Passport strategy:', err)
        return done(err, false, { message: 'Internal server error' })
      }
    })
  )
}

export default Passport
