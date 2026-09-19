const express = require("express");

const hotelController = require("./hotel.controller");

const router = express.Router();

// Get all active hotels
router.get("/", hotelController.getHotels);

// Get one hotel
router.get("/:id", hotelController.getHotel);

module.exports = router;