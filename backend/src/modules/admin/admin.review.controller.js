const reviewService = require("./admin.review.service");


// --------------------------------
// Get all reviews
// --------------------------------

const getReviews = async (req, res) => {
  try {
    const reviews =
      await reviewService.getReviews(
        req.user
      );

    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Get one review
// --------------------------------

const getReviewById = async (req, res) => {
  try {
    const review =
      await reviewService.getReviewById(
        req.user,
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Delete review
// --------------------------------

const deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(
      req.user,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getReviews,
  getReviewById,
  deleteReview,
};