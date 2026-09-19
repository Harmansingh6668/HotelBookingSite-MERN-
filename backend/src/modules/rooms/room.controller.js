const roomService = require("./room.service");

const getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await roomService.getRoomsByHotelId(
      req.params.hotelId
    );

    return res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRoom = async (req, res) => {
  try {
    const room = await roomService.getRoomById(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room fetched successfully",
      room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getRoomsByHotel,
  getRoom,
};