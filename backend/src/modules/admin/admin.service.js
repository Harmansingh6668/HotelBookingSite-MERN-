const Room = require("../rooms/room.model");
const Booking = require("../bookings/booking.model");
const User = require("../users/user.model");
const Review = require("../reviews/review.model");
const Hotel = require("../hotels/hotel.model");

const getDashboard = async (user) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  // Make sure hotel exists
  const hotel = await Hotel.findById(user.hotelId);

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  // --------------------------------
  // Room statistics
  // --------------------------------

  const totalRooms = await Room.countDocuments({
    hotelId: user.hotelId,
  });

  const availableRooms = await Room.countDocuments({
    hotelId: user.hotelId,
    status: "AVAILABLE",
  });

  // --------------------------------
  // Booking statistics
  // --------------------------------

  const totalBookings = await Booking.countDocuments({
    hotelId: user.hotelId,
  });

  const pendingBookings = await Booking.countDocuments({
    hotelId: user.hotelId,
    status: "PENDING",
  });

  const confirmedBookings = await Booking.countDocuments({
    hotelId: user.hotelId,
    status: "CONFIRMED",
  });

  // --------------------------------
  // Customer statistics
  // --------------------------------

  const bookings = await Booking.find({
    hotelId: user.hotelId,
  }).select("userId");

  const customerIds = new Set(
    bookings.map((booking) =>
      booking.userId.toString()
    )
  );

  const totalCustomers = customerIds.size;

  // --------------------------------
  // Review statistics
  // --------------------------------

  const totalReviews = await Review.countDocuments({
    hotelId: user.hotelId,
  });

  // --------------------------------
  // Dashboard response
  // --------------------------------

  return {
    statistics: {
      totalRooms,
      availableRooms,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalCustomers,
      totalReviews,
    },
  };
};






const getHotel = async (user) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const hotel = await Hotel.findById(user.hotelId);

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return hotel;
};

const updateHotel = async (user, updateData) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const hotel = await Hotel.findById(user.hotelId);

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  // Hotel details
  if (updateData.name !== undefined) {
    hotel.name = updateData.name;
  }

  if (updateData.description !== undefined) {
    hotel.description = updateData.description;
  }

  if (updateData.address !== undefined) {
    hotel.address = updateData.address;
  }

  if (updateData.city !== undefined) {
    hotel.city = updateData.city;
  }

  if (updateData.country !== undefined) {
    hotel.country = updateData.country;
  }

  // Hotel images
  if (updateData.image !== undefined) {
    hotel.image = updateData.image;
  }

  // Hotel amenities
  if (updateData.amenities !== undefined) {
    hotel.amenities = updateData.amenities;
  }

  // Hotel status
  if (updateData.status !== undefined) {
    if (!["ACTIVE", "INACTIVE"].includes(updateData.status)) {
      throw new Error("Invalid hotel status");
    }

    hotel.status = updateData.status;
  }

  await hotel.save();

  return hotel;
};

module.exports = {
    getDashboard,
  getHotel,
  updateHotel,
};