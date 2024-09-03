import Banner from '../models/BannerModel.js'

const AddBannerData = async (req, res) => {
  const { title, description, image, brands, analytics } = req.body

  try {
    // Create a new banner instance
    const newBanner = new Banner({
      title,
      description,
      image,
      brands: brands.map((item) => item),
      analytics: analytics.map((item) => ({
        title: item.title,
        Nos: item.Nos,
      })),
    })

    // Save the banner to the database
    const savedBanner = await newBanner.save()

    if (savedBanner) {
      return res.status(201).json({
        error: false,
        success: true,
        data: {
          message: 'Banner added successfully',
          banner: savedBanner,
        },
      })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: true,
      success: false,
      data: {
        message: 'Internal Server Error',
      },
    })
  }
}

export { AddBannerData }
