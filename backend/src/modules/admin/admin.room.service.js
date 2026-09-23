const Room = require("../rooms/room.model");

// --------------------------------
// Get all rooms
// --------------------------------

const getRooms = async (user) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  return await Room.find({
    hotelId: user.hotelId,
  }).sort({
    createdAt: -1,
  });
};

// --------------------------------
// Get room by ID
// --------------------------------

const getRoomById = async (user, roomId) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const room = await Room.findOne({
    _id: roomId,
    hotelId: user.hotelId,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};

// --------------------------------
// Create room
// --------------------------------

const createRoom = async (user, roomData) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  // Check duplicate room number
  const existingRoom = await Room.findOne({
    hotelId: user.hotelId,
    roomNumber: roomData.roomNumber,
  });

  if (existingRoom) {
    throw new Error(
      "Room number already exists in this hotel"
    );
  }

  const room = await Room.create({
    ...roomData,

    // Never trust hotelId from frontend
    hotelId: user.hotelId,
  });

  return room;
};

// --------------------------------
// Update room
// --------------------------------

const updateRoom = async (user, roomId, roomData) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const room = await Room.findOne({
    _id: roomId,
    hotelId: user.hotelId,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  // Room number
  if (roomData.roomNumber !== undefined) {
    const existingRoom = await Room.findOne({
      hotelId: user.hotelId,
      roomNumber: roomData.roomNumber,
      _id: { $ne: roomId },
    });

    if (existingRoom) {
      throw new Error(
        "Room number already exists in this hotel"
      );
    }

    room.roomNumber = roomData.roomNumber;
  }

  // Room type
  if (roomData.roomType !== undefined) {
    room.roomType = roomData.roomType;
  }

  // Description
  if (roomData.description !== undefined) {
    room.description = roomData.description;
  }

  // Price
  if (roomData.pricePerNight !== undefined) {
    room.pricePerNight = roomData.pricePerNight;
  }

  // Amenities
  if (roomData.amenities !== undefined) {
    room.amenities = roomData.amenities;
  }

  // Capacity
  if (roomData.capacity !== undefined) {
    room.capacity = roomData.capacity;
  }

  // Bed type
  if (roomData.bedType !== undefined) {
    room.bedType = roomData.bedType;
  }

  // Images
  if (roomData.images !== undefined) {
    room.images = roomData.images;
  }

  // Status
  if (roomData.status !== undefined) {
    room.status = roomData.status;
  }

  await room.save();

  return room;
};

// --------------------------------
// Delete room
// --------------------------------

const deleteRoom = async (user, roomId) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const room = await Room.findOne({
    _id: roomId,
    hotelId: user.hotelId,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  await Room.deleteOne({
    _id: roomId,
    hotelId: user.hotelId,
  });

  return room;
};

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};