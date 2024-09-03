const PrivateHomeRoute = (req, res) => {
  return res.status(200).json({
    error: false,
    success: true,
    data: {
      message: 'This is a private Home route',
    },
  })
}

const HomePageData = async (req, res) => {}

export { PrivateHomeRoute }
