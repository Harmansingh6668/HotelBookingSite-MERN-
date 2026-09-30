import { apiClient } from "./client";

export const createPaymentOrder = (bookingId) =>
  apiClient("/api/payments/create-order", {
    method: "POST",
    headers: {
      "Idempotency-Key": `booking-${bookingId}`,
    },
    body: JSON.stringify({ bookingId }),
  });

export const verifyPayment = (paymentDetails) =>
  apiClient("/api/payments/verify", {
    method: "POST",
    body: JSON.stringify(paymentDetails),
  });