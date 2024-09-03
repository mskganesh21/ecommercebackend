import Brand from '../models/BrandModel.js'

const CreateBrand = async (req, res) => {
  const { name } = req.body

  try {
    const existing = await Brand.findOne({ name })

    if (existing) {
      return res.status(409).json({
        error: true,
        success: false,
        data: {
          message: 'Brand already exists',
        },
      })
    }

    const newBrand = new Brand({ name })
    const brand = await newBrand.save()

    if (brand) {
      return res.status(201).json({
        error: false,
        success: true,
        data: {
          message: 'Brand created successfully',
        },
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal server error',
      },
    })
  }
}

const GetAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}, { _id: 0, __v: 0 })
    if (brands) {
      return res.status(200).json({
        error: false,
        success: true,
        data: {
          brands,
        },
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal server error',
      },
    })
  }
}

export { CreateBrand, GetAllBrands }
