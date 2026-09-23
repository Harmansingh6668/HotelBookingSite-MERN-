import { apiClient } from "./api/client";

export const getAdminRooms = async () => {
  return apiClient("/admin/rooms");
};

export const getAdminRoomById = async (id) => {
  return apiClient(`/admin/rooms/${id}`);
};

export const createAdminRoom = async (roomData) => {
  return apiClient("/admin/rooms", {
    method: "POST",
    body: roomData,
  });
};

export const updateAdminRoom = async (id, roomData) => {
  return apiClient(`/admin/rooms/${id}`, {
    method: "PUT",
    body: roomData,
  });
};

export const deleteAdminRoom = async (id) => {
  return apiClient(`/admin/rooms/${id}`, {
    method: "DELETE",
  });
};