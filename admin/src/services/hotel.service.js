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

export const uploadAdminHotelImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return apiClient("/admin/hotel/images", {
    method: "POST",
    body: formData,
  });
};