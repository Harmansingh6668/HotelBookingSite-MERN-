import { apiClient } from "./client";

export const createBooking = async ({
  rooms,
  checkInDate,
  checkOutDate,
}) => {
  return apiClient("/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      rooms,
      checkInDate,
      checkOutDate,
    }),
  });
};

export const getMyBookings = async () => {
  return apiClient("/api/bookings/my-bookings");
};

export const getBookingById = async (bookingId) => {
  return apiClient(`/api/bookings/${bookingId}`);
};

export const cancelBooking = async (bookingId) => {
  return apiClient(`/api/bookings/${bookingId}/cancel`, {
    method: "PATCH",
  });
};