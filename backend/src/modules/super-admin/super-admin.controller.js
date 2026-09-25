const superAdminService = require("./super-admin.service");

// --------------------------------
// Create Hotel Admin + Hotel
// --------------------------------

const createHotelAdmin = async (req, res) => {
  try {
    const result =
      await superAdminService.createHotelAdmin(
        req.body
      );

    return res.status(201).json({
      success: true,
      message:
        "Hotel admin and hotel created successfully",

      admin: result.admin,

      hotel: result.hotel,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Get all hotels
// --------------------------------

const getAllHotels = async (req, res) => {
  try {
    const hotels =
      await superAdminService.getAllHotels();

    return res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------
// Get hotel details
// --------------------------------

const getHotelDetails = async (req, res) => {
  try {
    const hotel =
      await superAdminService.getHotelDetails(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      ...hotel,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------
// Update hotel status
// --------------------------------

const updateHotelStatus = async (req, res) => {
  try {
    const hotel =
      await superAdminService.updateHotelStatus(
        req.params.id,
        req.body.status
      );

    return res.status(200).json({
      success: true,
      message: "Hotel status updated successfully",
      hotel,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Dashboard
// --------------------------------

const getDashboard = async (req, res) => {
  try {
    const dashboard =
      await superAdminService.getDashboard();

    return res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Get all hotel admins
// --------------------------------

const getAllHotelAdmins = async (req, res) => {
  try {
    const admins =
      await superAdminService.getAllHotelAdmins();

    return res.status(200).json({
      success: true,
      hotelAdmins: admins,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------
// Get hotel admin details
// --------------------------------

const getHotelAdminDetails = async (req, res) => {
  try {
    const admin =
      await superAdminService.getHotelAdminDetails(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      hotelAdmin: admin,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------------------
// Update hotel admin status
// --------------------------------

const updateHotelAdminStatus = async (req, res) => {
  try {
    const admin =
      await superAdminService.updateHotelAdminStatus(
        req.params.id,
        req.body.status
      );

    return res.status(200).json({
      success: true,
      message:
        "Hotel Admin status updated successfully",
      hotelAdmin: admin,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// --------------------------------
// Get all bookings
// --------------------------------

const getAllBookings = async (req, res) => {
  try {
    const bookings =
      await superAdminService.getAllBookings();

    return res.status(200).json({
      success: true,
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
// Get booking details
// --------------------------------

const getBookingDetails = async (req, res) => {
  try {
    const booking =
      await superAdminService.getBookingDetails(
        req.params.id
      );

    return res.status(200).json({
      success: true,
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
// Get all reviews
// --------------------------------

const getAllReviews = async (req, res) => {
  try {
    const reviews =
      await superAdminService.getAllReviews();

    return res.status(200).json({
      success: true,
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
// Get review details
// --------------------------------

const getReviewDetails = async (req, res) => {
  try {
    const review =
      await superAdminService.getReviewDetails(
        req.params.id
      );

    return res.status(200).json({
      success: true,
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
    await superAdminService.deleteReview(
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
  createHotelAdmin,
    getDashboard,
     getAllHotels,
  getHotelDetails,
  updateHotelStatus,
  
  getAllHotelAdmins,
  getHotelAdminDetails,
  updateHotelAdminStatus,

    getAllBookings,
  getBookingDetails,

  getAllReviews,
getReviewDetails,
deleteReview,
};