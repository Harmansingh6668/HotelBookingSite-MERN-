const Hotel = require("../hotels/hotel.model");

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
  getHotel,
  updateHotel,
};