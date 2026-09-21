const Booking = require("./booking.model");

// --------------------------------
// Find overlapping booking
// for one room
// --------------------------------

const findOverlappingBooking = async (
  roomId,
  checkInDate,
  checkOutDate
) => {
  return await Booking.findOne({
    "rooms.roomId": roomId,

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

// --------------------------------
// Create booking
// --------------------------------

const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};

// --------------------------------
// Get customer's bookings
// --------------------------------

const findBookingsByUserId = async (userId) => {
  return await Booking.find({
    userId,
  })
    .populate(
      "hotelId",
      "name city address image rating"
    )
    .populate(
      "rooms.roomId",
      "roomNumber roomType pricePerNight images capacity"
    )
    .sort({
      createdAt: -1,
    });
};

// --------------------------------
// Find booking by ID
// --------------------------------

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
      "name city address image rating"
    )
    .populate(
      "rooms.roomId",
      "roomNumber roomType pricePerNight images capacity"
    );
};

// --------------------------------
// Update booking status
// --------------------------------

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