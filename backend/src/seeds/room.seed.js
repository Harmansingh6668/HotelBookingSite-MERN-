require("dotenv").config();

const mongoose = require("mongoose");

const Hotel = require("../modules/hotels/hotel.model");
const Room = require("../modules/rooms/room.model");

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const hotels = await Hotel.find();

    if (hotels.length === 0) {
      console.log("No hotels found. Please seed hotels first.");
      await mongoose.connection.close();
      return;
    }

    const rooms = [
      {
        hotelId: hotels[0]._id,
        roomNumber: "101",
        roomType: "SINGLE",
        description: "Comfortable single room for one guest.",
        pricePerNight: 2000,
        capacity: 1,
        bedType: "SINGLE",
        amenities: [
          "Free WiFi",
          "TV",
          "Air Conditioning",
        ],
        images: [],
        status: "AVAILABLE",
      },

      {
        hotelId: hotels[0]._id,
        roomNumber: "102",
        roomType: "DELUXE",
        description: "Spacious deluxe room for couples.",
        pricePerNight: 3500,
        capacity: 2,
        bedType: "KING",
        amenities: [
          "Free WiFi",
          "TV",
          "Air Conditioning",
          "Mini Bar",
        ],
        images: [],
        status: "AVAILABLE",
      },

      {
        hotelId: hotels[0]._id,
        roomNumber: "103",
        roomType: "SUITE",
        description: "Luxury suite with a spacious living area.",
        pricePerNight: 6000,
        capacity: 4,
        bedType: "KING",
        amenities: [
          "Free WiFi",
          "TV",
          "Air Conditioning",
          "Mini Bar",
          "Room Service",
        ],
        images: [],
        status: "AVAILABLE",
      },

      {
        hotelId: hotels[1]._id,
        roomNumber: "201",
        roomType: "DOUBLE",
        description: "Comfortable double room.",
        pricePerNight: 2800,
        capacity: 2,
        bedType: "DOUBLE",
        amenities: [
          "Free WiFi",
          "TV",
          "Air Conditioning",
        ],
        images: [],
        status: "AVAILABLE",
      },

      {
        hotelId: hotels[1]._id,
        roomNumber: "202",
        roomType: "FAMILY",
        description: "Large family room suitable for families.",
        pricePerNight: 4500,
        capacity: 4,
        bedType: "QUEEN",
        amenities: [
          "Free WiFi",
          "TV",
          "Air Conditioning",
          "Breakfast",
        ],
        images: [],
        status: "AVAILABLE",
      },
    ];

    for (const room of rooms) {
      const existingRoom = await Room.findOne({
        hotelId: room.hotelId,
        roomNumber: room.roomNumber,
      });

      if (existingRoom) {
        console.log(
          `Room ${room.roomNumber} already exists`
        );
        continue;
      }

      await Room.create(room);

      console.log(
        `Room ${room.roomNumber} created`
      );
    }

    console.log("Room seeding completed");

    await mongoose.connection.close();
  } catch (error) {
    console.error(
      "Room seed failed:",
      error.message
    );

    process.exit(1);
  }
};

seedRooms();