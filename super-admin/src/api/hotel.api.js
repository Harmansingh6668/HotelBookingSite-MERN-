import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export const getHotels = async () => {
  return apiClient(ENDPOINTS.hotels);
};

export const getHotelById = async (id) => {
  return apiClient(ENDPOINTS.hotelById(id));
};

export const getHotelCount = async () => {
  return apiClient(ENDPOINTS.hotelCount);
};