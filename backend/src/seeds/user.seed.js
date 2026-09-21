require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../modules/users/user.model");
const Hotel = require("../modules/hotels/hotel.model");

const HOTEL_NAME = "Grand Palace Hotel";

const users = [
  {
    name: "John Customer",
    email: "customer@test.com",
    password: "123456",
    phone: "9876543210",
    role: "CUSTOMER",
    status: "ACTIVE",
    emailVerified: true,
    hotelId: null,
  },

  {
    name: "Hotel Manager",
    email: "manager@test.com",
    password: "123456",
    phone: "9876543211",
    role: "HOTEL_ADMIN",
    status: "ACTIVE",
    emailVerified: true,
    hotelId: null,
  },

  {
    name: "Super Admin",
    email: "admin@test.com",
    password: "123456",
    phone: "9876543212",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    emailVerified: true,
    hotelId: null,
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const hotel = await Hotel.findOne({
      name: HOTEL_NAME,
    }).select("_id");

    if (!hotel) {
      throw new Error(
        `Hotel "${HOTEL_NAME}" not found. Run hotel.seed.js first.`
      );
    }

    const hotelId = hotel._id;

    for (const user of users) {
      const hotelIdForUser = [
        "HOTEL_ADMIN",
        "SUPER_ADMIN",
      ].includes(user.role)
        ? hotelId
        : null;

      const existingUser = await User.findOne({
        email: user.email,
      });

      // Update existing user
      if (existingUser) {
        existingUser.name = user.name;
        existingUser.phone = user.phone;
        existingUser.role = user.role;
        existingUser.status = user.status;
        existingUser.emailVerified = user.emailVerified;
        existingUser.hotelId = hotelIdForUser;

        // Reset password
        existingUser.passwordHash = await bcrypt.hash(user.password, 10);

        await existingUser.save();

        console.log(`${user.email} updated`);
        continue;
      }

      // Hash password for new user
      const passwordHash = await bcrypt.hash(user.password, 10);

      // Create new user
      await User.create({
        name: user.name,
        email: user.email,
        passwordHash,
        phone: user.phone,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
        hotelId: hotelIdForUser,
      });

      console.log(`${user.email} created`);
    }

    console.log("User seeding completed");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seed failed:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedUsers();