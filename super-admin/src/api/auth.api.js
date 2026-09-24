import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export const login = async (credentials) => {
  return apiClient(ENDPOINTS.login, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};