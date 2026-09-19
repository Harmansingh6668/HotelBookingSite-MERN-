const User = require("../users/user.model");

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserForLogin = async (email) => {
  return await User.findOne({ email }).select("+passwordHash");
};

const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  findUserByEmail,
  findUserForLogin,
  createUser,
};