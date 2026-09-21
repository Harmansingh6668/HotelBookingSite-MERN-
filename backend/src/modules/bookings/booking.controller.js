const bookingService = require("./booking.service");

// --------------------------------
// Create booking
// --------------------------------

const createBooking = async (req, res) => {
  try {
    const {
      rooms,
      checkInDate,
      checkOutDate,
    } = req.body;

    const booking =
      await bookingService.createBooking({
        userId: req.user._id,

        rooms,

        checkInDate,

        checkOutDate,
      });

    return res.status(201).json({
      success: true,
      message:
        "Booking created successfully",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------
// Get my bookings
// --------------------------------

const getMyBookings = async (req, res) => {
  try {
    const bookings =
      await bookingService.getMyBookings(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Bookings fetched successfully",

      count: bookings.length,

      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------
// Get one booking
// --------------------------------

const getBooking = async (req, res) => {
  try {
    const booking =
      await bookingService.getBookingById(
        req.params.id,
        req.user.id
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Booking fetched successfully",

      booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------
// Cancel booking
// --------------------------------

const cancelBooking = async (req, res) => {
  try {
    const booking =
      await bookingService.cancelBooking(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Booking cancelled successfully",

      booking,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking,
};