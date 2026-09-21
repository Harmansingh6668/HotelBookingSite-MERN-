const express = require("express");

const hotelController = require("./hotel.controller");

const router = express.Router();

// Get all active hotels
router.get("/", hotelController.getHotels);

// Get the total number of active hotels
router.get("/count", hotelController.getHotelCount);

// Search active hotels by destination and room availability
router.get("/search", hotelController.searchHotels);

// Get one hotel
router.get("/:id", hotelController.getHotel);

module.exports = router;