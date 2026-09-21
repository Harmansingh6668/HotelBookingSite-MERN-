import { apiClient } from "../api/client";

const TOKEN_KEY = "aauji_auth_token";
const USER_KEY = "aauji_auth_user";

const AUTH_ENDPOINTS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  // forgotPassword: "/auth/forgot-password",
  // verifyOtp: "/auth/verify-otp",
  // resendOtp: "/auth/resend-otp",
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function persistSession(payload = {}) {
  const token =
    payload.token || payload.accessToken || payload.data?.token || null;
  const user = payload.user || payload.data?.user || null;

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  window.dispatchEvent(new Event("aauji-auth-change"));
  return { token, user, raw: payload };
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("aauji-auth-change"));
}

export async function loginRequest({ email, password }) {
  const data = await apiClient(AUTH_ENDPOINTS.login, {
    method: "POST",
    body: JSON.stringify({ email: email.trim(), password }),
  });

  return persistSession(data);
}

export async function registerRequest({ firstName, lastName, email, password, phone }) {
  return apiClient(AUTH_ENDPOINTS.register, {
    method: "POST",
    body: JSON.stringify({
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      password,
      phone: phone.trim(),
    }),
  });
}

// export async function forgotPasswordRequest({ email }) {
//   return apiClient(AUTH_ENDPOINTS.forgotPassword, {
//     method: "POST",
//     body: JSON.stringify({ email: email.trim() }),
//   });
// }

// export async function verifyOtpRequest({ email, otp }) {
//   const data = await apiClient(AUTH_ENDPOINTS.verifyOtp, {
//     method: "POST",
//     body: JSON.stringify({ email: email.trim(), otp }),
//   });

//   return persistSession(data);
// }

// export async function resendOtpRequest({ email }) {
//   return apiClient(AUTH_ENDPOINTS.resendOtp, {
//     method: "POST",
//     body: JSON.stringify({ email: email.trim() }),
//   });
// }

// export function startGoogleAuth() {
//   window.location.href = `${API_BASE_URL}/auth/google`;
// }

export { AUTH_ENDPOINTS, TOKEN_KEY, USER_KEY };
