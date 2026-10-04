const express = require("express");
const cors = require("cors");
const userRoutes = require("./modules/users/user.routes");
const authRoutes = require("./modules/auth/auth.routes");
const hotelRoutes = require("./modules/hotels/hotel.routes");
const roomRoutes = require("./modules/rooms/room.routes");
const bookingRoutes = require("./modules/bookings/booking.routes");
const reviewRoutes = require("./modules/reviews/review.routes");
//Admin
const adminRoutes = require("./modules/admin/admin.routes");

const superAdminRoutes = require("./modules/super-admin/super-admin.routes");

const errorMiddleware = require("./modules/middleware/error.middleware");

const app = express();

const localOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];
const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);
const allowedOrigins = [
  ...(process.env.NODE_ENV === "production" ? [] : localOrigins),
  ...configuredOrigins,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hotel Booking API is running" });
});

//User routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
//Admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/super-admin", superAdminRoutes);

app.use(errorMiddleware);
module.exports = app;
