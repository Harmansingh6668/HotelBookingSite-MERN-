const Booking = require("./booking.model");

// Find overlapping booking for a room
const findOverlappingBooking = async (
  roomId,
  checkInDate,
  checkOutDate
) => {
  return await Booking.findOne({
    roomId,

    status: {
      $in: ["PENDING", "CONFIRMED"],
    },

    checkInDate: {
      $lt: checkOutDate,
    },

    checkOutDate: {
      $gt: checkInDate,
    },
  });
};

// Create booking
const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};

// Get all bookings of a customer
const findBookingsByUserId = async (userId) => {
  return await Booking.find({
    userId,
  })
    .populate(
      "hotelId",
      "name city address images rating"
    )
    .populate(
      "roomId",
      "roomNumber roomType pricePerNight images"
    )
    .sort({
      createdAt: -1,
    });
};

// Find one booking belonging to a customer
const findBookingByIdAndUserId = async (
  bookingId,
  userId
) => {
  return await Booking.findOne({
    _id: bookingId,
    userId,
  })
    .populate(
      "hotelId",
      "name city address images rating"
    )
    .populate(
      "roomId",
      "roomNumber roomType pricePerNight images"
    );
};

// Update booking status
const updateBookingStatus = async (
  bookingId,
  userId,
  status
) => {
  return await Booking.findOneAndUpdate(
    {
      _id: bookingId,
      userId,
    },
    {
      status,
    },
    {
      new: true,
    }
  );
};

module.exports = {
  findOverlappingBooking,
  createBooking,
  findBookingsByUserId,
  findBookingByIdAndUserId,
  updateBookingStatus,
};