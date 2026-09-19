const reviewService = require("./review.service");

// --------------------------------
// Create review
// --------------------------------

const createReview = async (req, res) => {
  try {
    const {
      hotelId,
      bookingId,
      rating,
      comment,
    } = req.body;

    const review =
      await reviewService.createReview({
        userId: req.user._id,
        hotelId,
        bookingId,
        rating,
        comment,
      });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
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
// Get hotel reviews
// --------------------------------

const getHotelReviews = async (req, res) => {
  try {
    const reviews =
      await reviewService.getHotelReviews(
        req.params.hotelId
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

const getReview = async (req, res) => {
  try {
    const review =
      await reviewService.getReviewById(
        req.params.id
      );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

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
// Update review
// --------------------------------

const updateReview = async (req, res) => {
  try {
    const {
      rating,
      comment,
    } = req.body;

    const review =
      await reviewService.updateReview({
        reviewId: req.params.id,
        userId: req.user._id,
        rating,
        comment,
      });

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
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
    await reviewService.deleteReview({
      reviewId: req.params.id,
      userId: req.user._id,
    });

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
  createReview,
  getHotelReviews,
  getReview,
  updateReview,
  deleteReview,
};