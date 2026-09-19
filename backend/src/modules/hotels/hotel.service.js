const hotelRepository = require("./hotel.repository");

const getAllHotels = async (city) => {
  return await hotelRepository.findAllHotels(city);
};

const getHotelById = async (hotelId) => {
  return await hotelRepository.findHotelById(hotelId);
};

module.exports = {
  getAllHotels,
  getHotelById,
};