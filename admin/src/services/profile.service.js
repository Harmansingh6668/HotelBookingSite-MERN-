import { apiClient } from "./api/client";

export const getAdminProfile = async () => {
  return apiClient("/users/me");
};

export const updateAdminProfile = async (profile) => {
  return apiClient("/users/me", {
    method: "PATCH",
    body: profile,
  });
};
