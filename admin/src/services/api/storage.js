export const ADMIN_TOKEN_KEY = "aauji_admin_token";
export const ADMIN_USER_KEY = "aauji_admin_user";

export const getAdminToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const getAdminUser = () => {
  const user = localStorage.getItem(ADMIN_USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const saveAdminSession = (token, user) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(
    ADMIN_USER_KEY,
    JSON.stringify(user)
  );
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
};