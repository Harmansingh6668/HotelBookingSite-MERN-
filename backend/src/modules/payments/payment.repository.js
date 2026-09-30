const Payment = require("./payment.model");

const findByIdempotencyKey = async (
  idempotencyKey
) => {
  return await Payment.findOne({
    idempotencyKey,
  });
};

const findByRazorpayOrderId = async (razorpayOrderId) => {
  return Payment.findOne({ razorpayOrderId });
};

const createPayment = async (paymentData) => {
  return await Payment.create(paymentData);
};

const findById = async (paymentId) => {
  return await Payment.findById(paymentId);
};

const updatePayment = async (
  paymentId,
  updateData
) => {
  return await Payment.findByIdAndUpdate(
    paymentId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  findByIdempotencyKey,
  findByRazorpayOrderId,
  createPayment,
  findById,
  updatePayment,
};