import { apiClient } from "./client";

export const getRoomsByHotel = async (hotelId) => {
  return apiClient(`/api/rooms/hotel/${hotelId}`);
};

export const getRoomById = async (roomId) => {
  return apiClient(`/api/rooms/${roomId}`);
};