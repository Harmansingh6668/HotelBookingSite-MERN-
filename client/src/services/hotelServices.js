import { apiClient } from "./api/client";
import { ENDPOINTS } from "./api/endpoints";

export const getHotels = async () => {
  return apiClient(ENDPOINTS.hotels);
};

export const getHotelById = async (id) => {
  return apiClient(ENDPOINTS.hotelById(id));
};

export const searchHotels = async (params) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  return apiClient(`${ENDPOINTS.searchHotels}?${query.toString()}`);
};