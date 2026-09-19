const userRepository = require("./user.repository");

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

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUsersByRole,
};