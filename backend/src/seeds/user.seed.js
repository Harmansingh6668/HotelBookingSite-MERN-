require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../modules/users/user.model");

const users = [
  {
    name: "John Customer",
    email: "customer@test.com",
    password: "123456",
    phone: "9876543210",
    role: "CUSTOMER",
    status: "ACTIVE",
    emailVerified: true,
  },

  {
    name: "Hotel Manager",
    email: "manager@test.com",
    password: "123456",
    phone: "9876543211",
    role: "HOTEL_ADMIN",
    status: "ACTIVE",
    emailVerified: true,
  },

  {
    name: "Super Admin",
    email: "admin@test.com",
    password: "123456",
    phone: "9876543212",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    emailVerified: true,
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const user of users) {
      // Check if user already exists
      const existingUser = await User.findOne({
        email: user.email,
      });

      // If user exists, don't create again
      if (existingUser) {
        console.log(`${user.email} already exists`);
        continue;
      }

      // Hash password
      const passwordHash = await bcrypt.hash(user.password, 10);

      // Create user
      await User.create({
        name: user.name,
        email: user.email,
        passwordHash,
        phone: user.phone,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
      });

      console.log(`${user.email} created`);
    }

    console.log("User seeding completed");

    await mongoose.connection.close();
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedUsers();