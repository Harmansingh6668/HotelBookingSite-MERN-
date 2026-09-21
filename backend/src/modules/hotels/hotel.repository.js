const Hotel = require("./hotel.model");
const Room = require("../rooms/room.model");
const Booking = require("../bookings/booking.model");

const findAllHotels = async (city) => {
    const query = { status: "ACTIVE" };
    if (city) {
        query.city = city;
    }
    return await Hotel.find(query).sort({ createdAt: -1 });
};

const countActiveHotels = async () => {
    return await Hotel.countDocuments({ status: "ACTIVE" });
};

const findAvailableHotels = async (city, checkInDate, checkOutDate, guests, rooms) => {
    const query = { status: "ACTIVE" };
    if (city) query.city = new RegExp(`^${city}$`, "i");

    const hotels = await Hotel.find(query).sort({ createdAt: -1 });
    const result = [];
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const guestCount = Number(guests) || 1;
    const roomCount = Number(rooms) || 1;

    for (const hotel of hotels) {
        const hotelRooms = await Room.find({
            hotelId: hotel._id,
            status: "AVAILABLE",
        });
        const roomIds = hotelRooms.map((room) => room._id);
        const bookings = await Booking.find({
            roomId: { $in: roomIds },
            status: { $ne: "CANCELLED" },
            checkInDate: { $lt: checkOut },
            checkOutDate: { $gt: checkIn },
        }).select("roomId");
        const bookedRoomIds = new Set(bookings.map((booking) => booking.roomId.toString()));
        const availableRooms = hotelRooms.filter(
            (room) => !bookedRoomIds.has(room._id.toString())
        );

        if (
            availableRooms.length >= roomCount &&
            availableRooms.reduce((total, room) => total + room.capacity, 0) >= guestCount
        ) {
            result.push(hotel);
        }
    }

    return result;
};

const findHotelById = async (hotelId) => {
    return await Hotel.findOne(
        { _id: hotelId, 
            
            status: "ACTIVE" })
        };


        module.exports = {
            findAllHotels,
            countActiveHotels,
            findAvailableHotels,
            findHotelById,
        };
