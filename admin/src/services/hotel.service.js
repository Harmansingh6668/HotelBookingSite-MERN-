import { apiClient } from "./api/client";

export const getAdminHotel = async () => {
  return apiClient("/admin/hotel");
};

export const updateAdminHotel = async (hotelData) => {
  return apiClient("/admin/hotel", {
    method: "PUT",
    body: hotelData,
  });
};