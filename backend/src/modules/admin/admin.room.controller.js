const roomService = require("./admin.room.service");
const adminImageService = require("./admin.image.service");

const uploadRoomImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Choose an image to upload.",
    });
  }

  try {
    const image = await adminImageService.uploadRoomImage(req.user, req.file);

    return res.status(201).json({
      success: true,
      image,
    });
  } catch (error) {
    return res.status(error.statusCode || 502).json({
      success: false,
      message: error.message || "Unable to upload room image.",
    });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await roomService.getRooms(req.user);

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await roomService.getRoomById(
      req.user,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(
      req.user,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};






const updateRoom = async (req, res) => {
  try {
    const room = await roomService.updateRoom(
      req.user,
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    await roomService.deleteRoom(
      req.user,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadRoomImage,
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};