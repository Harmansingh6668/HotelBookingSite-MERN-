import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export const getCurrentUser = () => {
  return apiClient(ENDPOINTS.currentUser);
};

export const updateCurrentUser = (data) => {
  return apiClient(ENDPOINTS.currentUser, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};