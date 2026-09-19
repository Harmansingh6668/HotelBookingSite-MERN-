const mongoose = require("mongoose");

const bookingRepository = require("./booking.repository");

const Hotel = require("../hotels/hotel.model");
const Room = require("../rooms/room.model");

const createBooking = async ({
  userId,
  roomId,
  checkInDate,
  checkOutDate,
  guests,
}) => {
  // --------------------------------
  // 1. Validate room ID
  // --------------------------------

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new Error("Invalid room ID");
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
    throw new Error("Invalid check-in or check-out date");
  }

  if (checkOut <= checkIn) {
    throw new Error(
      "Check-out date must be after check-in date"
    );
  }

  // --------------------------------
  // 3. Validate guests
  // --------------------------------

  const numberOfGuests = Number(guests);

  if (
    !Number.isInteger(numberOfGuests) ||
    numberOfGuests < 1
  ) {
    throw new Error(
      "Number of guests must be at least 1"
    );
  }

  // --------------------------------
  // 4. Find room
  // --------------------------------

  const room = await Room.findOne({
    _id: roomId,
    status: "AVAILABLE",
  });

  if (!room) {
    throw new Error("Room not found or unavailable");
  }

  // --------------------------------
  // 5. Check room capacity
  // --------------------------------

  if (numberOfGuests > room.capacity) {
    throw new Error(
      `This room can accommodate maximum ${room.capacity} guests`
    );
  }

  // --------------------------------
  // 6. Find hotel
  // --------------------------------

  const hotel = await Hotel.findOne({
    _id: room.hotelId,
    status: "ACTIVE",
  });

  if (!hotel) {
    throw new Error("Hotel not found or inactive");
  }

  // --------------------------------
  // 7. Check room availability
  // --------------------------------

  const overlappingBooking =
    await bookingRepository.findOverlappingBooking(
      roomId,
      checkIn,
      checkOut
    );

  if (overlappingBooking) {
    throw new Error(
      "This room is already booked for the selected dates"
    );
  }

  // --------------------------------
  // 8. Calculate number of nights
  // --------------------------------

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  const totalNights = Math.ceil(
    (checkOut - checkIn) / millisecondsPerDay
  );

  // --------------------------------
  // 9. Calculate total amount
  // --------------------------------

  const pricePerNight = room.pricePerNight;

  const totalAmount =
    pricePerNight * totalNights;

  // --------------------------------
  // 10. Create booking
  // --------------------------------

  const booking =
    await bookingRepository.createBooking({
      userId,
      hotelId: hotel._id,
      roomId: room._id,

      checkInDate: checkIn,
      checkOutDate: checkOut,

      guests: numberOfGuests,

      pricePerNight,
      totalNights,
      totalAmount,

      status: "PENDING",
      paymentStatus: "PENDING",
    });

  // --------------------------------
  // 11. Return booking
  // --------------------------------

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
// Get one customer booking
// --------------------------------

const getBookingById = async (
  bookingId,
  userId
) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking ID");
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
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking ID");
  }

  const booking =
    await bookingRepository.findBookingByIdAndUserId(
      bookingId,
      userId
    );

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.status === "CANCELLED") {
    throw new Error("Booking is already cancelled");
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