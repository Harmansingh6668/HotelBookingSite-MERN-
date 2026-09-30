import { apiClient } from "./client";
import {
  getAdminToken,
  getAdminUser,
  saveAdminSession,
  clearAdminSession,
} from "./storage";

export const adminLogin = async (email, password) => {
  const data = await apiClient("/auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  if (!data?.token || !data?.user) {
    throw new Error("The server returned an incomplete login response.");
  }

  if (data.user?.role !== "HOTEL_ADMIN") {
    throw new Error(
      "This account does not have hotel manager access"
    );
  }

  if (!data.user?.hotelId) {
    throw new Error(
      "No hotel is assigned to this manager account"
    );
  }

  saveAdminSession(data.token, data.user);

  return data;
};

export {
  getAdminToken,
  getAdminUser,
  clearAdminSession,
};