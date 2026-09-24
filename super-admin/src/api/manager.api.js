import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

const HOTEL_ADMIN_ROLE = "HOTEL_ADMIN";

export const getManagers = async () => {
  return apiClient(ENDPOINTS.usersByRole(HOTEL_ADMIN_ROLE));
};

export const getManagerById = async (id) => {
  return apiClient(ENDPOINTS.userById(id));
};