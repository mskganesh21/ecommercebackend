import Tags from '../models/TagsModel.js'

const CreateTags = async (req, res) => {
  const { name } = req.body
  try {
    const existing = await Tags.findOne({ name })
    if (existing) {
      return res.status(409).json({
        error: true,
        success: false,
        data: {
          message: 'Tag already exists',
        },
      })
    }

    const newTag = new Tags({ name })
    const tag = await newTag.save()
    if (tag) {
      return res.status(201).json({
        error: false,
        success: true,
        data: {
          message: 'Tag created successfully',
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

const GetAllTags = async (req, res) => {
  try {
    const tags = await Tags.find({}, { _id: 0, __v: 0 })
    if (tags) {
      return res.status(200).json({
        error: false,
        success: true,
        data: {
          tags,
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

export { CreateTags, GetAllTags }
