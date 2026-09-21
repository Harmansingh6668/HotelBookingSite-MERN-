const mongoose = require("mongoose");

const Review = require("../reviews/review.model");


// --------------------------------
// Get all reviews for admin's hotel
// --------------------------------

const getReviews = async (user) => {
  if (!user.hotelId) {
    throw new Error(
      "Hotel is not assigned to this admin"
    );
  }

  const reviews = await Review.find({
    hotelId: user.hotelId,
  })
    .populate(
      "userId",
      "name email phone"
    )
    .populate(
      "bookingId",
      "checkInDate checkOutDate totalAmount status"
    )
    .sort({
      createdAt: -1,
    });

  return reviews;
};


// --------------------------------
// Get one review
// --------------------------------

const getReviewById = async (
  user,
  reviewId
) => {
  if (!user.hotelId) {
    throw new Error(
      "Hotel is not assigned to this admin"
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(reviewId)
  ) {
    throw new Error("Invalid review ID");
  }

  const review = await Review.findOne({
    _id: reviewId,
    hotelId: user.hotelId,
  })
    .populate(
      "userId",
      "name email phone"
    )
    .populate(
      "bookingId",
      "checkInDate checkOutDate totalAmount status"
    );

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
};


// --------------------------------
// Delete review
// --------------------------------

const deleteReview = async (
  user,
  reviewId
) => {
  if (!user.hotelId) {
    throw new Error(
      "Hotel is not assigned to this admin"
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(reviewId)
  ) {
    throw new Error("Invalid review ID");
  }

  const review = await Review.findOne({
    _id: reviewId,
    hotelId: user.hotelId,
  });

  if (!review) {
    throw new Error("Review not found");
  }

  const hotelId = review.hotelId;

  await Review.deleteOne({
    _id: reviewId,
    hotelId: user.hotelId,
  });

  // Recalculate hotel rating
  const ratingData = await Review.aggregate([
    {
      $match: {
        hotelId: hotelId,
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

  const averageRating = Number(
    ratingData[0]?.averageRating || 0
  ).toFixed(1);

  const reviewsCount =
    ratingData[0]?.reviewCount || 0;

  const Hotel = require("../hotels/hotel.model");

  await Hotel.findByIdAndUpdate(
    hotelId,
    {
      rating: Number(averageRating),
      reviewsCount,
    }
  );

  return review;
};


module.exports = {
  getReviews,
  getReviewById,
  deleteReview,
};