import { getAdminToken, clearAdminSession } from "./storage";
import { API_BASE_URL } from "./baseUrl";

export const API_ERROR_EVENT = "admin:api-error";
export const ADMIN_SESSION_EXPIRED_EVENT = "admin:session-expired";

const reportApiError = (error) => {
  window.dispatchEvent(
    new CustomEvent(API_ERROR_EVENT, {
      detail: { message: error.message },
    })
  );
};

export const apiClient = async (endpoint, options = {}) => {
  const isLoginRequest = endpoint === "/auth/login";
  const token = isLoginRequest ? null : getAdminToken();
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(options.headers || {}),
  };

  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (isFormData) {
    delete headers["Content-Type"];
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      body:
        options.body && typeof options.body !== "string" && !isFormData
          ? JSON.stringify(options.body)
          : options.body,
      headers,
    });
  } catch (error) {
    const fetchError =
      error instanceof Error
        ? error
        : new Error("Unable to connect to the server. Please try again.");
    if (!isLoginRequest) {
      reportApiError(fetchError);
    }
    throw fetchError;
  }

  let data = null;

  if (response.status !== 204) {
    try {
      data = await response.json();
      console.log("API Response Data:", data); // Log the response data for debugging
    } catch {
      if (response.ok) {
        const error = new Error("The server returned an invalid response.");
        if (!isLoginRequest) {
          reportApiError(error);
        }
        throw error;
      }
    }
  }

  if (response.status === 401) {
    if (token) {
      clearAdminSession();
      window.dispatchEvent(new Event(ADMIN_SESSION_EXPIRED_EVENT));
    }

    const error = new Error(
      data?.message || "Your session has expired. Please sign in again."
    );
    if (!isLoginRequest) {
      reportApiError(error);
    }
    throw error;
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || "Something went wrong with the request"
    );
    if (!isLoginRequest) {
      reportApiError(error);
    }
    throw error;
  }

  return data;
};