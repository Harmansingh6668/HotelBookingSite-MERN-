import { apiClient } from "./api/client";

export const getAdminBookings = async () => {
  return apiClient("/admin/bookings");
};

export const getAdminBookingById = async (id) => {
  return apiClient(`/admin/bookings/${id}`);
};

export const updateAdminBookingStatus = async (id, status) => {
  return apiClient(`/admin/bookings/${id}/status`, {
    method: "PUT",
    body: {
      status,
    },
  });
};