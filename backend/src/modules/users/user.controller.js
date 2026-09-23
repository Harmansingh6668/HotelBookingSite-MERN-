const userService = require("./user.service");

// Get all users
const getUsers = async (req, res) => {
     console.log("1. Controller reached");
  try {
    const users = await userService.getAllUsers();
    console.log("2. Users:", users);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user by ID
const getUser = async (req, res) => {
  try {
    const user =
      req.params.id === "me"
        ? await userService.getCurrentUser(
            req.user.id || req.user._id
          )
        : await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get users by role
const getUsersByRole = async (req, res) => {
  try {
    const users = await userService.getUsersByRole(req.params.role);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const serializeUser = (user) => ({
  id: user._id || user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  hotelId: user.hotelId,
  status: user.status,
  emailVerified: user.emailVerified,
});

const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getCurrentUser(
      req.user.id || req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: serializeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCurrentUser = async (req, res) => {
  try {
    const user = await userService.updateCurrentUser(
      req.user.id || req.user._id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: serializeUser(user),
    });
  } catch (error) {
    const statusCode =
      error.message === "Email address is already in use"
        ? 409
        : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  getUsersByRole,
  getCurrentUser,
  updateCurrentUser,
};