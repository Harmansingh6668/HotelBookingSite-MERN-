const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = (
  configuredApiBaseUrl || (import.meta.env.DEV ? "http://localhost:8080" : "")
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

export async function apiClient(endpoint, options = {}) {
  if (!API_BASE_URL && !import.meta.env.DEV) {
    throw new Error(
      "VITE_API_BASE_URL is missing. Set it to your deployed backend URL."
    );
  }

  
  const token = localStorage.getItem("aauji_auth_token");
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
   if(!response.ok && response.status === 401) {
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