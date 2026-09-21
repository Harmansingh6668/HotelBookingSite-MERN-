const mongoose = require("mongoose");

const bookingRepository = require("./booking.repository");

const Hotel = require("../hotels/hotel.model");
const Room = require("../rooms/room.model");

// --------------------------------
// Create multiple-room booking
// --------------------------------

const createBooking = async ({
  userId,
  rooms,
  checkInDate,
  checkOutDate,
}) => {
  // --------------------------------
  // 1. Validate rooms
  // --------------------------------

  if (!Array.isArray(rooms) || rooms.length === 0) {
    throw new Error(
      "At least one room must be selected"
    );
  }

  // --------------------------------
  // 2. Validate dates
  // --------------------------------

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (
    Number.isNaN(checkIn.getTime()) ||
    Number.isNaN(checkOut.getTime())
  ) {
    throw new Error(
      "Invalid check-in or check-out date"
    );
  }

  if (checkOut <= checkIn) {
    throw new Error(
      "Check-out date must be after check-in date"
    );
  }

  // --------------------------------
  // 3. Calculate nights
  // --------------------------------

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  const totalNights = Math.ceil(
    (checkOut - checkIn) / millisecondsPerDay
  );

  // --------------------------------
  // 4. Find all selected rooms
  // --------------------------------

  const roomIds = rooms.map(
    (room) => room.roomId
  );

  // Check duplicate room IDs
  const uniqueRoomIds = new Set(
    roomIds.map((id) => id.toString())
  );

  if (uniqueRoomIds.size !== roomIds.length) {
    throw new Error(
      "The same room cannot be selected twice"
    );
  }

  // Validate ObjectIds
  for (const roomId of roomIds) {
    if (
      !mongoose.Types.ObjectId.isValid(roomId)
    ) {
      throw new Error(
        `Invalid room ID: ${roomId}`
      );
    }
  }

  const roomDocuments = await Room.find({
    _id: {
      $in: roomIds,
    },
    status: "AVAILABLE",
  });

  // --------------------------------
  // 5. Check all rooms exist
  // --------------------------------

  if (roomDocuments.length !== roomIds.length) {
    throw new Error(
      "One or more selected rooms are unavailable"
    );
  }

  // --------------------------------
  // 6. Check all rooms belong
  // to same hotel
  // --------------------------------

  const hotelIds = new Set(
    roomDocuments.map((room) =>
      room.hotelId.toString()
    )
  );

  if (hotelIds.size !== 1) {
    throw new Error(
      "All rooms must belong to the same hotel"
    );
  }

  const hotelId = roomDocuments[0].hotelId;

  // --------------------------------
  // 7. Find hotel
  // --------------------------------

  const hotel = await Hotel.findOne({
    _id: hotelId,
    status: "ACTIVE",
  });

  if (!hotel) {
    throw new Error(
      "Hotel not found or inactive"
    );
  }

  // --------------------------------
  // 8. Check each room
  // --------------------------------

  const bookingRooms = [];

  for (const selectedRoom of rooms) {
    const room = roomDocuments.find(
      (roomDocument) =>
        roomDocument._id.toString() ===
        selectedRoom.roomId.toString()
    );

    if (!room) {
      throw new Error(
        "Selected room not found"
      );
    }

    // ------------------------------
    // Validate guests
    // ------------------------------

    const guests = Number(
      selectedRoom.guests
    );

    if (
      !Number.isInteger(guests) ||
      guests < 1
    ) {
      throw new Error(
        `Invalid guests for room ${room.roomNumber}`
      );
    }

    // ------------------------------
    // Check capacity
    // ------------------------------

    if (guests > room.capacity) {
      throw new Error(
        `Room ${room.roomNumber} can accommodate maximum ${room.capacity} guests`
      );
    }

    // ------------------------------
    // Check overlapping booking
    // ------------------------------

    const overlappingBooking =
      await bookingRepository.findOverlappingBooking(
        room._id,
        checkIn,
        checkOut
      );

    if (overlappingBooking) {
      throw new Error(
        `Room ${room.roomNumber} is already booked for the selected dates`
      );
    }

    // ------------------------------
    // Calculate room price
    // ------------------------------

    const pricePerNight =
      room.pricePerNight;

    const roomTotalAmount =
      pricePerNight * totalNights;

    bookingRooms.push({
      roomId: room._id,
      guests,
      pricePerNight,
      totalAmount: roomTotalAmount,
    });
  }

  // --------------------------------
  // 9. Calculate total booking price
  // --------------------------------

  const totalAmount = bookingRooms.reduce(
    (total, room) => {
      return total + room.totalAmount;
    },
    0
  );

  // --------------------------------
  // 10. Create booking
  // --------------------------------

  const booking =
    await bookingRepository.createBooking({
      userId,

      hotelId,

      rooms: bookingRooms,

      checkInDate: checkIn,

      checkOutDate: checkOut,

      totalNights,

      totalAmount,

      status: "PENDING",

      paymentStatus: "PENDING",
    });

  return booking;
};

// --------------------------------
// Get customer's bookings
// --------------------------------

const getMyBookings = async (userId) => {
  return await bookingRepository.findBookingsByUserId(
    userId
  );
};

// --------------------------------
// Get one booking
// --------------------------------

const getBookingById = async (
  bookingId,
  userId
) => {
  if (
    !mongoose.Types.ObjectId.isValid(
      bookingId
    )
  ) {
    throw new Error(
      "Invalid booking ID"
    );
  }

  return await bookingRepository.findBookingByIdAndUserId(
    bookingId,
    userId
  );
};

// --------------------------------
// Cancel booking
// --------------------------------

const cancelBooking = async (
  bookingId,
  userId
) => {
  if (
    !mongoose.Types.ObjectId.isValid(
      bookingId
    )
  ) {
    throw new Error(
      "Invalid booking ID"
    );
  }

  const booking =
    await bookingRepository.findBookingByIdAndUserId(
      bookingId,
      userId
    );

  if (!booking) {
    throw new Error(
      "Booking not found"
    );
  }

  if (booking.status === "CANCELLED") {
    throw new Error(
      "Booking is already cancelled"
    );
  }

  if (booking.status === "COMPLETED") {
    throw new Error(
      "Completed booking cannot be cancelled"
    );
  }

  const cancelledBooking =
    await bookingRepository.updateBookingStatus(
      bookingId,
      userId,
      "CANCELLED"
    );

  return cancelledBooking;
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
};