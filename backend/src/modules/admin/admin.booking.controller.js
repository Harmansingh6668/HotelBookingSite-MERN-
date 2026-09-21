const bookingService = require("./admin.booking.service");


// --------------------------------
// Get all bookings
// --------------------------------

const getBookings = async (req, res) => {
  try {
    const bookings =
      await bookingService.getBookings(
        req.user
      );

    return res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Get one booking
// --------------------------------

const getBookingById = async (req, res) => {
  try {
    const booking =
      await bookingService.getBookingById(
        req.user,
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message: "Booking fetched successfully",
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
// Update booking status
// --------------------------------

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking =
      await bookingService.updateBookingStatus(
        req.user,
        req.params.id,
        status
      );

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
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
  getBookings,
  getBookingById,
  updateBookingStatus,
};