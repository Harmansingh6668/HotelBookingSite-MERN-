const paymentService = require("./payment.service");

const createPaymentOrder = async (
  req,
  res
) => {
  try {
    const {
      bookingId,
    } = req.body;

    const idempotencyKey =
      req.headers["idempotency-key"];

    const result =
      await paymentService.createPaymentOrder({
        userId: req.user._id,
        bookingId,
        idempotencyKey,
      });

    return res.status(201).json({
      success: true,
      message:
        "Payment order created successfully",
      payment: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const payment = await paymentService.verifyPayment({
      userId: req.user._id,
      razorpayOrderId: req.body.razorpay_order_id,
      razorpayPaymentId: req.body.razorpay_payment_id,
      razorpaySignature: req.body.razorpay_signature,
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};