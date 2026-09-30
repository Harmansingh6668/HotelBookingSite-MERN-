const express = require("express");

const paymentController = require("./payment.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/create-order",
  authMiddleware,
  paymentController.createPaymentOrder
);

module.exports = router;