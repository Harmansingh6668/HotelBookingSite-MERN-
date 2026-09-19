const Review = require("./review.model");

// --------------------------------
// Create review
// --------------------------------

const createReview = async (reviewData) => {
  return await Review.create(reviewData);
};

// --------------------------------
// Find review by customer + hotel
// --------------------------------

const findReviewByUserAndHotel = async (
  userId,
  hotelId
) => {
  return await Review.findOne({
    userId,
    hotelId,
  });
};

// --------------------------------
// Find review by ID
// --------------------------------

const findReviewById = async (reviewId) => {
  return await Review.findById(reviewId)
    .populate(
      "userId",
      "name"
    )
    .populate(
      "hotelId",
      "name city"
    )
    .populate(
      "bookingId",
      "checkInDate checkOutDate"
    );
};

// --------------------------------
// Find reviews for a hotel
// --------------------------------

const findReviewsByHotelId = async (hotelId) => {
  return await Review.find({
    hotelId,
  })
    .populate(
      "userId",
      "name"
    )
    .sort({
      createdAt: -1,
    });
};

// --------------------------------
// Update customer's review
// --------------------------------

const updateReview = async (
  reviewId,
  userId,
  reviewData
) => {
  return await Review.findOneAndUpdate(
    {
      _id: reviewId,
      userId,
    },
    reviewData,
    {
      new: true,
      runValidators: true,
    }
  );
};

// --------------------------------
// Delete customer's review
// --------------------------------

const deleteReview = async (
  reviewId,
  userId
) => {
  return await Review.findOneAndDelete({
    _id: reviewId,
    userId,
  });
};

// --------------------------------
// Calculate hotel rating
// --------------------------------

const getHotelRating = async (hotelId) => {
  const result = await Review.aggregate([
    {
      $match: {
        hotelId,
      },
    },

    {
      $group: {
        _id: "$hotelId",

        averageRating: {
          $avg: "$rating",
        },

        reviewCount: {
          $sum: 1,
        },
      },
    },
  ]);

  return result[0] || {
    averageRating: 0,
    reviewCount: 0,
  };
};

module.exports = {
  createReview,
  findReviewByUserAndHotel,
  findReviewById,
  findReviewsByHotelId,
  updateReview,
  deleteReview,
  getHotelRating,
};