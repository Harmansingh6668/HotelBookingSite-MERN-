import { apiClient } from "./client";

export const registerUser = async (userData) => {
  return apiClient("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (credentials) => {
  return apiClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};