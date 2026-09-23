const userRepository = require("./user.repository");
const User = require("./user.model");

// Get all users
const getAllUsers = async () => {
     console.log("3. Service reached");
  const users = await userRepository.findAllUsers();
    console.log("4. Repository returned:", users);

  return users;
};

// Get user by ID
const getUserById = async (userId) => {
  const user = await userRepository.findUserById(userId);

  return user;
};

// Get user by email
const getUserByEmail = async (email) => {
  const user = await userRepository.findUserByEmail(email);

  return user;
};

// Get users by role
const getUsersByRole = async (role) => {
  const users = await userRepository.findUsersByRole(role);

  return users;
};

const getCurrentUser = async (userId) => {
  return userRepository.findUserById(userId);
};

const updateCurrentUser = async (userId, updateData) => {
  const allowedFields = ["name", "email", "phone"];
  const updates = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      const value = String(updateData[field]).trim();

      if (!value) {
        throw new Error(`${field} cannot be empty`);
      }

      updates[field] = field === "email" ? value.toLowerCase() : value;
    }
  }

  if (updates.email) {
    const existingUser = await User.findOne({
      email: updates.email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new Error("Email address is already in use");
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    updates,
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUsersByRole,
  getCurrentUser,
  updateCurrentUser,
};