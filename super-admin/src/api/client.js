import { ENDPOINTS } from "./endpoints";

// const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
// const configuredApiUrlIsLocal =
//   /^https?:\/\/(localhost|127(?:\.\d{1,3}){3})(:\d+)?(?:\/|$)/i.test(
//     configuredApiBaseUrl || ""
//   );
// const defaultApiBaseUrl = import.meta.env.DEV
//   ? "http://localhost:8080/api"
//   : "https://hotelbookingsite-mern.onrender.com/api";
// const API_BASE_URL = (
//   configuredApiBaseUrl &&
//   !(import.meta.env.PROD && configuredApiUrlIsLocal)
//     ? configuredApiBaseUrl
//     : defaultApiBaseUrl
// )
//   .replace(/\/+$/, "")
//   .replace(/\/api$/i, "")
//   .concat("/api");

export const ADMIN_SESSION_EXPIRED_EVENT = "admin:session-expired";

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("aauji_auth_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (response.status === 401) {
    const error = new Error(
      data?.message || "Your session has expired. Please sign in again."
    );

    error.status = response.status;
    error.data = data;

    if (endpoint !== ENDPOINTS.login) {
      window.dispatchEvent(new Event(ADMIN_SESSION_EXPIRED_EVENT));
    }

    throw error;
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || "Something went wrong with the request."
    );

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
};