import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export const getDashboardStatistics = async () => {
  return apiClient(ENDPOINTS.superAdmin.dashboard);
};

export const getHotels = async () => {
  return apiClient(ENDPOINTS.superAdmin.hotels);
};