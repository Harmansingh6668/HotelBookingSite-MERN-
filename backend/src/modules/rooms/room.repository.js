const Room = require("./room.model");

const findRoomsByHotelId = async (hotelId) => {
  return await Room.find({
    hotelId,
    status: "AVAILABLE",
  }).sort({
    pricePerNight: 1,
  });
};

const findRoomById = async (roomId) => {
  return await Room.findOne({
    _id: roomId,
    status: "AVAILABLE",
  }).populate(
    "hotelId",
    "name city address images rating"
  );
};

module.exports = {
  findRoomsByHotelId,
  findRoomById,
};