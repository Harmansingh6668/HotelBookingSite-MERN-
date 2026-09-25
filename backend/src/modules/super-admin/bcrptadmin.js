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

      images: [],

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

module.exports = {
  createHotelAdmin,
};