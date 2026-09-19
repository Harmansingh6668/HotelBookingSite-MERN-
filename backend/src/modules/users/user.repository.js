const User = require("./user.model");

// Get all users
const findAllUsers = async () => {
  console.log("5. Repository reached");
  const users = await User.find();
    console.log("6. Database result:", users);

  return users;
};

// Get one user by ID
const findUserById = async (userId) => {
  const user = await User.findById(userId);

  return user;
};

// Get user by email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

// Get users by role
const findUsersByRole = async (role) => {
  const users = await User.find({ role });
  console.log(users);

  return users;
};

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  findUsersByRole,
};