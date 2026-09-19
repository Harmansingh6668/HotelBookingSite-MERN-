const express = require("express");

const bookingController = require("./booking.controller");

const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

// Create booking
router.post(
  "/",
  authMiddleware,
  allowRoles("CUSTOMER"),
  bookingController.createBooking
);

// Get customer's bookings
router.get(
  "/my-bookings",
  authMiddleware,
  allowRoles("CUSTOMER"),
  bookingController.getMyBookings
);

// Get one booking
router.get(
  "/:id",
  authMiddleware,
  allowRoles("CUSTOMER"),
  bookingController.getBooking
);

// Cancel booking
router.patch(
  "/:id/cancel",
  authMiddleware,
  allowRoles("CUSTOMER"),
  bookingController.cancelBooking
);

module.exports = router;