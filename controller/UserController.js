import bcryptjs from 'bcryptjs'
import User from '../models/UserModel.js'
import { CreateToken } from '../utils/createToken.js'
import jwt from 'jsonwebtoken'

// Register a new user
const RegisterUser = async (req, res) => {
  // Validate the user input
  const { name, email, password } = req.body

  try {
    // Check if user already exists
    const ExistingUser = await User.findOne({ email })

    if (ExistingUser) {
      return res.status(409).json({
        error: true,
        success: false,
        data: {
          message: 'User already exists. Please login.',
        },
      })
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()
    res.status(201).json({
      error: false,
      success: true,
      data: {
        message: 'User registered successfully.Please Login to continue.',
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal Server Error',
      },
    })
  }
}

// Login user
const LoginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // find the user with the email
    const user = await User.findOne({ email })

    //if user is not found
    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'User not found',
        },
      })
    }

    //compare password with user in db
    const validatePassword = await bcryptjs.compare(password, user.password)

    //if password is not valid
    if (!validatePassword) {
      return res.status(401).json({
        error: true,
        success: false,
        data: {
          message: 'Password is incorrect',
        },
      })
    }

    //creating an accessToken
    const accessToken = CreateToken(
      process.env.ACCESS_TOKEN_SECRET,
      'jwt',
      user._id.toString(),
      '1m'
    )

    //creating a refreshToken
    const refreshToken = CreateToken(
      process.env.REFRESH_TOKEN_SECRET,
      'jwt',
      user._id.toString(),
      '1d'
    )

    //save the refreshtoken in db
    user.refreshToken = refreshToken
    await user.save()

    //send refreshtoken as a cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      error: false,
      success: true,
      data: {
        accessToken,
        message: 'Login Successful',
      },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal Server Error',
      },
    })
  }
}

const ReauthenticateUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decoded.jwt)

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({
        error: true,
        success: false,
        data: {
          message: 'Refresh token is not valid, please login again.',
        },
      })
    }

    //create new accessToken
    const accessToken = CreateToken(
      process.env.ACCESS_TOKEN_SECRET,
      'jwt',
      user._id.toString(),
      '1m'
    )

    res.status(200).json({
      error: false,
      success: true,
      data: {
        accessToken,
        message: 'Access Token Generated',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal Server Error',
      },
    })
  }
}

const LogoutUser = async (req, res) => {
  //get the refresh token in the cookie
  //validate refresh token
  //remove the refesh token in db
  //remove the cookie in the browser
  //send response
}

export { RegisterUser, LoginUser, ReauthenticateUser, LogoutUser }
