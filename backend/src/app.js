const express = require("express");
const cors = require("cors");
const userRoutes = require("./modules/users/user.routes");
const authRoutes = require("./modules/auth/auth.routes");
const hotelRoutes = require("./modules/hotels/hotel.routes");
const roomRoutes = require("./modules/rooms/room.routes");
const bookingRoutes = require("./modules/bookings/booking.routes");
const reviewRoutes = require("./modules/reviews/review.routes");

const errorMiddleware = require("./modules/middleware/error.middleware");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
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

app.use(errorMiddleware);
module.exports = app;
