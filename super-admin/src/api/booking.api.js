import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export const getBookings = async () => {
  return apiClient(ENDPOINTS.superAdmin.bookings);
};

export const getBookingById = async (id) => {
  return apiClient(ENDPOINTS.superAdmin.bookingById(id));
};
