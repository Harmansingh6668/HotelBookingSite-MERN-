const express = require("express");

const superAdminController = require(
  "./super-admin.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const allowRoles = require(
  "../middleware/role.middleware"
);

const router = express.Router();

// --------------------------------
// Create Hotel Admin + Hotel
// --------------------------------
router.get(
  "/dashboard",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getDashboard
);


router.get(
  "/hotels",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getAllHotels
);

router.get(
  "/hotels/:id",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getHotelDetails
);

router.put(
  "/hotels/:id/status",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.updateHotelStatus
);


router.post(
  "/hotel-admins",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.createHotelAdmin
);

router.get(
  "/hotel-admins",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getAllHotelAdmins
);

router.get(
  "/hotel-admins/:id",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getHotelAdminDetails
);

router.put(
  "/hotel-admins/:id/status",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.updateHotelAdminStatus
);

router.get(
  "/bookings",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getAllBookings
);

router.get(
  "/bookings/:id",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getBookingDetails
);


router.get(
  "/reviews",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getAllReviews
);

router.get(
  "/reviews/:id",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.getReviewDetails
);

router.delete(
  "/reviews/:id",
  authMiddleware,
  allowRoles("SUPER_ADMIN"),
  superAdminController.deleteReview
);


module.exports = router;