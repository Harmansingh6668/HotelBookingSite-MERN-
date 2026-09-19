const express = require("express");

const reviewController = require("./review.controller");

const authMiddleware = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

// --------------------------------
// Public routes
// --------------------------------

// Get all reviews for a hotel
router.get(
  "/hotel/:hotelId",
  reviewController.getHotelReviews
);

// Get one review
router.get(
  "/:id",
  reviewController.getReview
);

// --------------------------------
// Customer routes
// --------------------------------

// Create review
router.post(
  "/",
  authMiddleware,
  allowRoles("CUSTOMER"),
  reviewController.createReview
);

// Update own review
router.patch(
  "/:id",
  authMiddleware,
  allowRoles("CUSTOMER"),
  reviewController.updateReview
);

// Delete own review
router.delete(
  "/:id",
  authMiddleware,
  allowRoles("CUSTOMER"),
  reviewController.deleteReview
);

module.exports = router;