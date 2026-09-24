import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export const getHotels = async () => {
  return apiClient(ENDPOINTS.dashboard.hotels);
};

export const getHotelCount = async () => {
  return apiClient(ENDPOINTS.dashboard.hotelCount);
};