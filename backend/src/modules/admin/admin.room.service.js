const Room = require("../rooms/room.model");

const getRooms = async (user) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const rooms = await Room.find({
    hotelId: user.hotelId,
  }).sort({
    roomNumber: 1,
  });

  return rooms;
};

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

const createRoom = async (user, roomData) => {
  if (!user.hotelId) {
    throw new Error("Hotel is not assigned to this admin");
  }

  const existingRoom = await Room.findOne({
    hotelId: user.hotelId,
    roomNumber: roomData.roomNumber,
  });

  if (existingRoom) {
    throw new Error("Room number already exists in this hotel");
  }

  const room = await Room.create({
    hotelId: user.hotelId,
    roomNumber: roomData.roomNumber,
    roomType: roomData.roomType,
    description: roomData.description,
    pricePerNight: roomData.pricePerNight,
    amenities: roomData.amenities || [],
    capacity: roomData.capacity,
    bedType: roomData.bedType,
    images: roomData.images || [],
    status: roomData.status || "AVAILABLE",
  });

  return room;
};

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

  if (roomData.roomNumber !== undefined) {
    const existingRoom = await Room.findOne({
      hotelId: user.hotelId,
      roomNumber: roomData.roomNumber,
      _id: { $ne: roomId },
    });

    if (existingRoom) {
      throw new Error("Room number already exists in this hotel");
    }

    room.roomNumber = roomData.roomNumber;
  }

  if (roomData.roomType !== undefined) {
    room.roomType = roomData.roomType;
  }

  if (roomData.description !== undefined) {
    room.description = roomData.description;
  }

  if (roomData.pricePerNight !== undefined) {
    room.pricePerNight = roomData.pricePerNight;
  }

  if (roomData.amenities !== undefined) {
    room.amenities = roomData.amenities;
  }

  if (roomData.capacity !== undefined) {
    room.capacity = roomData.capacity;
  }

  if (roomData.bedType !== undefined) {
    room.bedType = roomData.bedType;
  }

  if (roomData.images !== undefined) {
    room.images = roomData.images;
  }

  if (roomData.status !== undefined) {
    room.status = roomData.status;
  }

  await room.save();

  return room;
};

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