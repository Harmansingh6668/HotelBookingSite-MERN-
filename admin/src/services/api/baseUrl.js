const renderApiBaseUrl = "https://hotelbookingsite-mern.onrender.com/api";
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const configuredApiUrlIsLocal =
  /^https?:\/\/(localhost|127(?:\.\d{1,3}){3})(:\d+)?(?:\/|$)/i.test(
    configuredApiBaseUrl || ""
  );
const defaultApiBaseUrl = import.meta.env.DEV
  ? "http://localhost:8080/api"
  : renderApiBaseUrl;

export const API_BASE_URL = (
  configuredApiBaseUrl &&
  !(import.meta.env.PROD && configuredApiUrlIsLocal)
    ? configuredApiBaseUrl
    : defaultApiBaseUrl
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "")
  .concat("/api");
