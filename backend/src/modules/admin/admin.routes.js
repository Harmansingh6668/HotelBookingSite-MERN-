const express = require("express");

const adminController = require("./admin.controller");

const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");
const roomController = require("./admin.room.controller");
const bookingController = require("./admin.booking.controller");
const reviewController = require("./admin.review.controller");
const router = express.Router();

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  allowRoles("HOTEL_ADMIN"),
  adminController.getDashboard
);

// Get hotel
router.get(
  "/hotel",
  authMiddleware,
  allowRoles("HOTEL_ADMIN", "SUPER_ADMIN"),
  adminController.getHotel
);

// Update hotel
router.put(
  "/hotel",
  authMiddleware,
  allowRoles("HOTEL_ADMIN", "SUPER_ADMIN"),
  adminController.updateHotel
);
router.get(
  "/rooms",
  authMiddleware,
  allowRoles("HOTEL_ADMIN", "SUPER_ADMIN"),
  roomController.getRooms
);

router.post(
  "/rooms",
  authMiddleware,
  allowRoles("HOTEL_ADMIN", "SUPER_ADMIN"),
  roomController.createRoom
);

router.get(
  "/rooms/:id",
  authMiddleware,
  allowRoles("HOTEL_ADMIN", "SUPER_ADMIN"),
  roomController.getRoomById
);

router.put(
  "/rooms/:id",
  authMiddleware,
  allowRoles("HOTEL_ADMIN", "SUPER_ADMIN"),
  roomController.updateRoom
);

router.delete(
  "/rooms/:id",
  authMiddleware,
  allowRoles("HOTEL_ADMIN", "SUPER_ADMIN"),
  roomController.deleteRoom
);


router.get(
  "/bookings",
  authMiddleware,
  allowRoles("HOTEL_ADMIN"),
  bookingController.getBookings
);

router.get(
  "/bookings/:id",
  authMiddleware,
  allowRoles("HOTEL_ADMIN"),
  bookingController.getBookingById
);

router.put(
  "/bookings/:id/status",
  authMiddleware,
  allowRoles("HOTEL_ADMIN"),
  bookingController.updateBookingStatus
);



router.get(
  "/reviews",
  authMiddleware,
  allowRoles("HOTEL_ADMIN"),
  reviewController.getReviews
);

router.get(
  "/reviews/:id",
  authMiddleware,
  allowRoles("HOTEL_ADMIN"),
  reviewController.getReviewById
);

router.delete(
  "/reviews/:id",
  authMiddleware,
  allowRoles("HOTEL_ADMIN"),
  reviewController.deleteReview
);
module.exports = router;