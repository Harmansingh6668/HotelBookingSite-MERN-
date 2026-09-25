const bcrypt = require("bcrypt");

const superAdminRepository = require("./super-admin.repository");

// --------------------------------
// Create Hotel Admin + Hotel
// --------------------------------

const createHotelAdmin = async (data) => {
  const {
    adminName,
    email,
    phone,
    password,

    hotelName,
    address,
    city,
    country,
  } = data;



  // --------------------------------
  // Validate admin information
  // --------------------------------

  if (!adminName) {
    throw new Error("Admin name is required");
  }

  if (!email) {
    throw new Error("Admin email is required");
  }

  if (!password) {
    throw new Error("Admin password is required");
  }

  // --------------------------------
  // Validate hotel information
  // --------------------------------

  if (!hotelName) {
    throw new Error("Hotel name is required");
  }

  if (!address) {
    throw new Error("Hotel address is required");
  }

  if (!city) {
    throw new Error("Hotel city is required");
  }

  if (!country) {
    throw new Error("Hotel country is required");
  }

  // --------------------------------
  // Check if email already exists
  // --------------------------------

  const existingUser =
    await superAdminRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error(
      "A user with this email already exists"
    );
  }

  // --------------------------------
  // Hash password
  // --------------------------------

  const passwordHash = await bcrypt.hash(
    password,
    10
  );

  // --------------------------------
  // Create basic hotel
  // --------------------------------

  const hotel =
    await superAdminRepository.createHotel({
      name: hotelName,
      address,
      city,
      country,

      description: "",

      image: [],

      amenities: [],

      status: "ACTIVE",

      profileCompleted: false,
    });

  try {
    // --------------------------------
    // Create Hotel Admin
    // --------------------------------

    const admin =
      await superAdminRepository.createHotelAdmin({
        name: adminName,
        email,
        phone,
        passwordHash,

        role: "HOTEL_ADMIN",

        hotelId: hotel._id,
      });

    // --------------------------------
    // Return result
    // --------------------------------

    return {
      admin,
      hotel,
    };
  } catch (error) {
    // --------------------------------
    // If admin creation fails,
    // remove the hotel we just created
    // --------------------------------

    await superAdminRepository.deleteHotel(
      hotel._id
    );

    throw error;
  }
};

// --------------------------------
// Get all hotels
// --------------------------------

const getAllHotels = async () => {
  return await superAdminRepository.getAllHotels();
};

// --------------------------------
// Get hotel details
// --------------------------------

const getHotelDetails = async (hotelId) => {
  const hotel =
    await superAdminRepository.getHotelById(
      hotelId
    );

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  const hotelAdmin =
    await superAdminRepository.findHotelAdmin(
      hotelId
    );

  const rooms =
    await superAdminRepository.getHotelRooms(
      hotelId
    );

  const bookings =
    await superAdminRepository.getHotelBookings(
      hotelId
    );

  const reviews =
    await superAdminRepository.getHotelReviews(
      hotelId
    );

  return {
    hotel,
    hotelAdmin,
    rooms,
    bookings,
    reviews,
  };
};

// --------------------------------
// Update hotel status
// --------------------------------

const updateHotelStatus = async (
  hotelId,
  status
) => {
  if (!["ACTIVE", "INACTIVE"].includes(status)) {
    throw new Error("Invalid hotel status");
  }

  const hotel =
    await superAdminRepository.updateHotelStatus(
      hotelId,
      status
    );

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return hotel;
};




const getDashboard = async () => {
  const dashboard =
    await superAdminRepository.getDashboardStatistics();

  return dashboard;


};

// --------------------------------
// Get all hotel admins
// --------------------------------

const getAllHotelAdmins = async () => {
  return await superAdminRepository.getAllHotelAdmins();
};

// --------------------------------
// Get hotel admin details
// --------------------------------

const getHotelAdminDetails = async (adminId) => {
  const admin =
    await superAdminRepository.getHotelAdminById(
      adminId
    );

  if (!admin) {
    throw new Error("Hotel Admin not found");
  }

  return admin;
};

// --------------------------------
// Update hotel admin status
// --------------------------------

const updateHotelAdminStatus = async (
  adminId,
  status
) => {
  if (!["ACTIVE", "SUSPENDED"].includes(status)) {
    throw new Error(
      "Invalid Hotel Admin status"
    );
  }

  const admin =
    await superAdminRepository.updateHotelAdminStatus(
      adminId,
      status
    );

  if (!admin) {
    throw new Error("Hotel Admin not found");
  }

  return admin;
};


// --------------------------------
// Get all bookings
// --------------------------------

const getAllBookings = async () => {
  return await superAdminRepository.getAllBookings();
};

// --------------------------------
// Get booking details
// --------------------------------

const getBookingDetails = async (bookingId) => {
  const booking =
    await superAdminRepository.getBookingById(
      bookingId
    );

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking;
};



// --------------------------------
// Get all reviews
// --------------------------------

const getAllReviews = async () => {
  return await superAdminRepository.getAllReviews();
};

// --------------------------------
// Get review details
// --------------------------------

const getReviewDetails = async (reviewId) => {
  const review =
    await superAdminRepository.getReviewById(
      reviewId
    );

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
};

// --------------------------------
// Delete review
// --------------------------------

const deleteReview = async (reviewId) => {
  const review =
    await superAdminRepository.deleteReview(
      reviewId
    );

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
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