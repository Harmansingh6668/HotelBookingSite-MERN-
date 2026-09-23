const jwt = require("jsonwebtoken");
const User = require("../users/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status !== "ACTIVE") {
      return res.status(401).json({
        success: false,
        message: "User account is not active",
      });
    }

    req.user = {
<<<<<<< Updated upstream
      _id: user._id,
      id: user._id,
=======
      id: user.id,
>>>>>>> Stashed changes
      name: user.name,
      email: user.email,
      phone: user.phone,
      hotelId: user.hotelId,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
    };    

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;