require("dotenv").config();

const mongoose = require("mongoose");

const Hotel = require("../modules/hotels/hotel.model");

// Add or edit hotel entries here before running `npm run seed:hotels`.
const hotels = [
  {
  hotelName: "Golden City Residency",
  description: "A modern and comfortable city hotel designed for families, couples, and business travellers visiting Amritsar. The property provides spacious rooms and convenient access to major attractions.",
  address: "45 Hall Bazaar Road",
  city: "Amritsar",
  country: "India",
  managerName: "Harpreet Singh",
  managerEmail: "harpreetsingh@gmail.com",
  managerPassword: "123456"
}
  
];

const seedHotels = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set. Configure it in the backend .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const hotel of hotels) {
      const result = await Hotel.updateOne(
        { name: hotel.name },
        { $setOnInsert: hotel },
        { upsert: true },
      );

      if (result.upsertedCount === 0) {
        console.log(`${hotel.name} already exists`);
        continue;
      }

      console.log(`${hotel.name} created`);
    }

    console.log("Hotel seeding completed");
  } catch (error) {
    console.error("Hotel seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
};

seedHotels();