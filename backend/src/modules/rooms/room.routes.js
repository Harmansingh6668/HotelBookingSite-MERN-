const express = require("express");

const roomController = require("./room.controller");

const router = express.Router();

// Get all available rooms of a hotel
router.get(
  "/hotel/:hotelId",
  roomController.getRoomsByHotel
);

// Get one room
router.get(
  "/:id",
  roomController.getRoom
);

module.exports = router;