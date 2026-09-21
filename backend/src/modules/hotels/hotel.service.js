const hotelRepository = require("./hotel.repository");

const getAllHotels = async (city) => {
  return await hotelRepository.findAllHotels(city);
};

const getActiveHotelCount = async () => {
  return await hotelRepository.countActiveHotels();
};

const searchHotels = async (city, checkInDate, checkOutDate, guests, rooms) => {
  return hotelRepository.findAvailableHotels(
    city,
    checkInDate,
    checkOutDate,
    guests,
    rooms
  );
};

const getHotelById = async (hotelId) => {
  return await hotelRepository.findHotelById(hotelId);
};

module.exports = {
  getAllHotels,
  getActiveHotelCount,
  searchHotels,
  getHotelById,
};