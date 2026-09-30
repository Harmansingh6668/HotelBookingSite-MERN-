const crypto = require("crypto");
const Razorpay = require("razorpay");

const paymentRepository = require("./payment.repository");
const bookingRepository = require("../bookings/booking.repository");

let razorpayClient;

const getRazorpayClient = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured on the server");
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  return razorpayClient;
};

const toOrderResponse = (payment) => ({
  paymentId: payment._id,
  bookingId: payment.bookingId,
  razorpayOrderId: payment.razorpayOrderId,
  amount: Math.round(payment.amount * 100),
  currency: payment.currency,
  status: payment.status,
  keyId: process.env.RAZORPAY_KEY_ID,
});

const createPaymentOrder = async ({
  userId,
  bookingId,
  idempotencyKey,
}) => {
  if (!idempotencyKey) {
    throw new Error(
      "Idempotency key is required"
    );
  }

  // --------------------------------
  // 1. Check existing payment
  // --------------------------------

  const existingPayment =
    await paymentRepository.findByIdempotencyKey(
      idempotencyKey
    );

  if (existingPayment) {
    if (
      existingPayment.bookingId.toString() !== bookingId.toString() ||
      existingPayment.userId.toString() !== userId.toString()
    ) {
      throw new Error("Idempotency key is already associated with another payment");
    }

    return toOrderResponse(existingPayment);
  }

  // --------------------------------
  // 2. Get booking
  // --------------------------------

  const booking = await bookingRepository.findBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  // --------------------------------
  // 3. Verify booking belongs to user
  // --------------------------------

  if (
    booking.userId.toString() !==
    userId.toString()
  ) {
    throw new Error(
      "You are not allowed to pay for this booking"
    );
  }

  // --------------------------------
  // 4. Check booking payment status
  // --------------------------------

  if (booking.paymentStatus === "PAID") {
    throw new Error(
      "Booking is already paid"
    );
  }

  // --------------------------------
  // 5. Amount from database
  // --------------------------------

  const amount = booking.totalAmount;

  if (!amount || amount <= 0) {
    throw new Error(
      "Invalid booking amount"
    );
  }

  // Razorpay expects amount in paise
  const amountInPaise = Math.round(
    amount * 100
  );

  // --------------------------------
  // 6. Create Razorpay order
  // --------------------------------

  const razorpayOrder = await getRazorpayClient().orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: bookingId.toString(),
    });

  // --------------------------------
  // 7. Create payment record
  // --------------------------------

  const payment =
    await paymentRepository.createPayment({
      bookingId,
      userId,
      amount,
      currency: "INR",
      idempotencyKey,
      razorpayOrderId:
        razorpayOrder.id,
      status: "CREATED",
    });

  // --------------------------------
  // 8. Connect payment to booking
  // --------------------------------

  await bookingRepository.updateBookingPayment(
    bookingId,
    payment._id
  );

  return toOrderResponse(payment);
};

const verifyPayment = async ({
  userId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    throw new Error("Razorpay payment details are incomplete");
  }

  const payment = await paymentRepository.findByRazorpayOrderId(razorpayOrderId);

  if (!payment) {
    throw new Error("Payment order not found");
  }

  if (payment.userId.toString() !== userId.toString()) {
    throw new Error("You are not allowed to verify this payment");
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error("Razorpay credentials are not configured on the server");
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const receivedBuffer = Buffer.from(razorpaySignature, "hex");

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    throw new Error("Payment signature verification failed");
  }

  const razorpayPayment = await getRazorpayClient().payments.fetch(
    razorpayPaymentId
  );
  const expectedAmount = Math.round(payment.amount * 100);

  if (
    razorpayPayment.order_id !== razorpayOrderId ||
    razorpayPayment.amount !== expectedAmount ||
    razorpayPayment.currency !== payment.currency
  ) {
    throw new Error("Payment details do not match this booking");
  }

  let capturedPayment = razorpayPayment;
  if (razorpayPayment.status === "authorized") {
    capturedPayment = await getRazorpayClient().payments.capture(
      razorpayPaymentId,
      expectedAmount,
      payment.currency
    );
  }

  if (capturedPayment.status !== "captured") {
    throw new Error("Payment has not been captured yet");
  }

  const booking = await bookingRepository.markBookingPaymentComplete(
    payment.bookingId,
    payment._id
  );

  if (!booking) {
    throw new Error("Booking could not be confirmed");
  }

  const updatedPayment = await paymentRepository.updatePayment(payment._id, {
    razorpayPaymentId,
    razorpaySignature,
    status: "PAID",
  });

  return {
    paymentId: updatedPayment._id,
    bookingId: booking._id,
    razorpayOrderId,
    razorpayPaymentId,
    status: updatedPayment.status,
    bookingStatus: booking.status,
    paymentStatus: booking.paymentStatus,
  };
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};