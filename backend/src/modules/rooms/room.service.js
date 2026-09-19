const roomRepository = require("./room.repository");

const getRoomsByHotelId = async (hotelId) => {
  return await roomRepository.findRoomsByHotelId(
    hotelId
  );
};

const getRoomById = async (roomId) => {
  return await roomRepository.findRoomById(roomId);
};

module.exports = {
  getRoomsByHotelId,
  getRoomById,
};