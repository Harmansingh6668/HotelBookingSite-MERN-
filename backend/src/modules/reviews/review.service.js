
const mongoose = require("mongoose");

const reviewRepository = require("./review.repository");

const Hotel = require("../hotels/hotel.model");
const Booking = require("../bookings/booking.model");

// --------------------------------
// Create review
// --------------------------------

const createReview = async ({
  userId,
  hotelId,
  bookingId,
  rating,
  comment,
}) => {
  // --------------------------------
  // 1. Validate IDs
  // --------------------------------

  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    throw new Error("Invalid hotel ID");
  }

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking ID");
  }

  // --------------------------------
  // 2. Validate rating
  // --------------------------------

  const numericRating = Number(rating);

  if (
    !Number.isInteger(numericRating) ||
    numericRating < 1 ||
    numericRating > 5
  ) {
    throw new Error(
      "Rating must be a whole number between 1 and 5"
    );
  }

  // --------------------------------
  // 3. Check hotel
  // --------------------------------

  const hotel = await Hotel.findOne({
    _id: hotelId,
    status: "ACTIVE",
  });

  if (!hotel) {
    throw new Error(
      "Hotel not found or inactive"
    );
  }

  // --------------------------------
  // 4. Check booking
  // --------------------------------

  const booking = await Booking.findOne({
    _id: bookingId,
    userId,
    hotelId,
    status: {
      $in: [
        "CONFIRMED",
        "COMPLETED",
      ],
    },
  });

  if (!booking) {
    throw new Error(
      "You can only review a hotel after a confirmed or completed booking"
    );
  }

  // --------------------------------
  // 5. Check existing review
  // --------------------------------

  const existingReview =
    await reviewRepository.findReviewByUserAndHotel(
      userId,
      hotelId
    );

  if (existingReview) {
    throw new Error(
      "You have already reviewed this hotel"
    );
  }

  // --------------------------------
  // 6. Create review
  // --------------------------------

  const review =
    await reviewRepository.createReview({
      userId,
      hotelId,
      bookingId,
      rating: numericRating,
      comment: comment || "",
    });

  // --------------------------------
  // 7. Update hotel rating
  // --------------------------------

  await updateHotelRating(hotelId);

  return review;
};

// --------------------------------
// Get hotel reviews
// --------------------------------

const getHotelReviews = async (hotelId) => {
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    throw new Error("Invalid hotel ID");
  }

  const hotel = await Hotel.findOne({
    _id: hotelId,
    status: "ACTIVE",
  });

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return await reviewRepository.findReviewsByHotelId(
    hotelId
  );
};

// --------------------------------
// Get one review
// --------------------------------

const getReviewById = async (reviewId) => {
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new Error("Invalid review ID");
  }

  return await reviewRepository.findReviewById(
    reviewId
  );
};

// --------------------------------
// Update review
// --------------------------------

const updateReview = async ({
  reviewId,
  userId,
  rating,
  comment,
}) => {
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new Error("Invalid review ID");
  }

  // --------------------------------
  // Validate rating
  // --------------------------------

  const numericRating = Number(rating);

  if (
    !Number.isInteger(numericRating) ||
    numericRating < 1 ||
    numericRating > 5
  ) {
    throw new Error(
      "Rating must be a whole number between 1 and 5"
    );
  }

  // --------------------------------
  // Check review
  // --------------------------------

  const existingReview =
    await reviewRepository.findReviewById(
      reviewId
    );

  if (!existingReview) {
    throw new Error("Review not found");
  }

  // Make sure user owns the review
  if (
    existingReview.userId._id.toString() !==
    userId.toString()
  ) {
    throw new Error(
      "You can only update your own review"
    );
  }

  // --------------------------------
  // Update
  // --------------------------------

  const updatedReview =
    await reviewRepository.updateReview(
      reviewId,
      userId,
      {
        rating: numericRating,
        comment: comment || "",
      }
    );

  // --------------------------------
  // Update hotel rating
  // --------------------------------

  await updateHotelRating(
    existingReview.hotelId._id
  );

  return updatedReview;
};

// --------------------------------
// Delete review
// --------------------------------

const deleteReview = async ({
  reviewId,
  userId,
}) => {
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new Error("Invalid review ID");
  }

  const existingReview =
    await reviewRepository.findReviewById(
      reviewId
    );

  if (!existingReview) {
    throw new Error("Review not found");
  }

  // Make sure user owns the review
  if (
    existingReview.userId._id.toString() !==
    userId.toString()
  ) {
    throw new Error(
      "You can only delete your own review"
    );
  }

  const hotelId =
    existingReview.hotelId._id;

  const deletedReview =
    await reviewRepository.deleteReview(
      reviewId,
      userId
    );

  if (!deletedReview) {
    throw new Error("Review could not be deleted");
  }

  // Update hotel rating
  await updateHotelRating(hotelId);

  return deletedReview;
};

// --------------------------------
// Update hotel's rating
// --------------------------------

const updateHotelRating = async (hotelId) => {
  const ratingData =
    await reviewRepository.getHotelRating(
      hotelId
    );

  const averageRating =
    Number(
      ratingData.averageRating || 0
    ).toFixed(1);

  await Hotel.findByIdAndUpdate(
    hotelId,
    {
      rating: Number(averageRating),
      reviewCount:
        ratingData.reviewCount || 0,
    }
  );
};

module.exports = {
  createReview,
  getHotelReviews,
  getReviewById,
  updateReview,
  deleteReview,
};