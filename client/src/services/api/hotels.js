import { apiClient } from "./client";

export const getHotels = async () => {
  return apiClient("/api/hotels");
};

export const getHotelCount = async () => {
  return apiClient("/api/hotels/count");
};

export const getHotelById = async (id) => {
  return apiClient(`/api/hotels/${id}`);
};

export const searchHotels = async (params) => {
  const query = new URLSearchParams(params);
  return apiClient(`/api/hotels/search?${query.toString()}`);
};