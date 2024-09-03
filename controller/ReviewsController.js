import Review from '../models/ReviewsModel.js'
const AddReviewOfAProduct = async (req, res) => {
  const { productId } = req.params

  const { userId, userName, rating, description } = req.body

  try {
    const newReview = new Review({
      productId,
      userId,
      userName,
      rating,
      description,
    })

    await newReview.save()

    return res.status(201).json({
      error: false,
      success: true,
      data: {
        message: 'Review added successfully',
        review: newReview,
      },
    })
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

const GetReviewsOfAProduct = async (req, res) => {
  const { productId } = req.params

  try {
    const reviews = await Review.find({ productId }).sort({ postedOn: -1 })

    return res.status(200).json({
      error: false,
      success: true,
      data: reviews,
    })
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

const UpdateReviewOfAProduct = async (req, res) => {
  const { reviewId } = req.params
  const { rating, description } = req.body

  try {
    const review = await Review.findById(reviewId)

    if (review) {
      review.rating = rating ?? review.rating
      review.description = description ?? review.description

      await review.save()

      return res.status(200).json({
        error: false,
        success: true,
        data: {
          message: 'Review updated successfully',
          review,
        },
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Review not found',
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

const RemoveReviewOfAProduct = async (req, res) => {
  const { reviewId } = req.params

  try {
    const review = await Review.findByIdAndDelete(reviewId)

    if (review) {
      return res.status(200).json({
        error: false,
        success: true,
        data: {
          message: 'Review removed successfully',
        },
      })
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        data: {
          message: 'Review not found',
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

export {
  AddReviewOfAProduct,
  GetReviewsOfAProduct,
  UpdateReviewOfAProduct,
  RemoveReviewOfAProduct,
}
