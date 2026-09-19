require("dotenv").config();

const mongoose = require("mongoose");

const Hotel = require("../modules/hotels/hotel.model");

const hotels = [
  {
    name: "Grand Palace Hotel",
    description:
      "A comfortable luxury hotel located in the heart of the city.",
    address: "MG Road",
    city: "Delhi",
    country: "India",
    images: [
      "https://example.com/hotel1.jpg",
      "https://example.com/hotel2.jpg",
    ],
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Restaurant",
    ],
    rating: 4.5,
    reviewCount: 120,
    status: "ACTIVE",
  },

  {
    name: "Royal Heritage Hotel",
    description:
      "A beautiful hotel offering comfortable rooms and modern facilities.",
    address: "Mall Road",
    city: "Amritsar",
    country: "India",
    images: [
      "https://example.com/hotel3.jpg",
      "https://example.com/hotel4.jpg",
    ],
    amenities: [
      "Free WiFi",
      "Parking",
      "Restaurant",
    ],
    rating: 4.2,
    reviewCount: 85,
    status: "ACTIVE",
  },

  {
    name: "City View Hotel",
    description:
      "A modern hotel with excellent city views and comfortable rooms.",
    address: "Sector 17",
    city: "Chandigarh",
    country: "India",
    images: [
      "https://example.com/hotel5.jpg",
    ],
    amenities: [
      "Free WiFi",
      "Gym",
      "Parking",
    ],
    rating: 4.0,
    reviewCount: 64,
    status: "ACTIVE",
  },
];

const seedHotels = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const hotel of hotels) {
      const existingHotel = await Hotel.findOne({
        name: hotel.name,
      });

      if (existingHotel) {
        console.log(`${hotel.name} already exists`);
        continue;
      }

      await Hotel.create(hotel);

      console.log(`${hotel.name} created`);
    }

    console.log("Hotel seeding completed");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Hotel seed failed:", error.message);
    process.exit(1);
  }
};

seedHotels();