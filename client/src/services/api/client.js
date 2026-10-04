const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const defaultApiBaseUrl = import.meta.env.DEV
  ? ""
  : "https://hotelbookingsite-mern.onrender.com";
const configuredApiUrlIsLocal =
  /^https?:\/\/(localhost|127(?:\.\d{1,3}){3})(:\d+)?(?:\/|$)/i.test(
    configuredApiBaseUrl?.trim() || ""
  );
const API_BASE_URL = (
  configuredApiBaseUrl && !(import.meta.env.PROD && configuredApiUrlIsLocal)
    ? configuredApiBaseUrl
    : defaultApiBaseUrl
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

export async function apiClient(endpoint, options = {}) {
  const token = localStorage.getItem("aauji_auth_token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok && response.status === 401) {
    localStorage.removeItem("aauji_auth_token");
    window.location.href = "/login";
  }
  const contentType = response.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}
