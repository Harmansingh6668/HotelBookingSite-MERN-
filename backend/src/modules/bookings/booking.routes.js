const express = require("express");

const bookingController = require("./booking.controller");

const authMiddleware = require("../middleware/auth.middleware");

const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  allowRoles("CUSTOMER"),
  bookingController.createBooking
);

router.get(
  "/my-bookings",
  authMiddleware,
  allowRoles("CUSTOMER"),
  bookingController.getMyBookings
);

router.get(
  "/:id",
  authMiddleware,
  allowRoles("CUSTOMER"),
  bookingController.getBooking
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  allowRoles("CUSTOMER"),
  bookingController.cancelBooking
);

module.exports = router;