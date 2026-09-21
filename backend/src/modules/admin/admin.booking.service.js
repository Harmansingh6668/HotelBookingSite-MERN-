const mongoose = require("mongoose");

const Booking = require("../bookings/booking.model");


// --------------------------------
// Get all bookings for admin's hotel
// --------------------------------

const getBookings = async (user) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const bookings = await Booking.find({
    hotelId: user.hotelId,
  })
    .populate(
      "userId",
      "name email phone"
    )
    .populate(
      "hotelId",
      "name city address"
    )
    .populate(
      "rooms.roomId",
      "roomNumber roomType pricePerNight capacity"
    )
    .sort({
      createdAt: -1,
    });

  return bookings;
};


// --------------------------------
// Get one booking
// --------------------------------

const getBookingById = async (
  user,
  bookingId
) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking ID");
  }

  const booking = await Booking.findOne({
    _id: bookingId,
    hotelId: user.hotelId,
  })
    .populate(
      "userId",
      "name email phone"
    )
    .populate(
      "hotelId",
      "name city address"
    )
    .populate(
      "rooms.roomId",
      "roomNumber roomType pricePerNight capacity"
    );

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};


// --------------------------------
// Update booking status
// --------------------------------

const updateBookingStatus = async (
  user,
  bookingId,
  status
) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking ID");
  }

  const allowedStatuses = [
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
    "COMPLETED",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid booking status");
  }

  const booking = await Booking.findOne({
    _id: bookingId,
    hotelId: user.hotelId,
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = status;

  await booking.save();

  return booking;
};


module.exports = {
  getBookings,
  getBookingById,
  updateBookingStatus,
};