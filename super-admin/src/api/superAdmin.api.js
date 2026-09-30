import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export const createHotel = (data) => {
  return apiClient(
    ENDPOINTS.superAdmin.createHotelAdmin,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};