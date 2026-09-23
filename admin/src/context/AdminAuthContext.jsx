import { createContext, useContext, useState } from "react";
import {
  adminLogin,
  getAdminToken,
  getAdminUser,
  clearAdminSession as logoutAdmin,
} from "../services/api/adminAuth";
import { saveAdminSession } from "../services/api/storage";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => getAdminToken());
  const [user, setUser] = useState(() => getAdminUser());

  const login = async (email, password) => {
    const data = await adminLogin(email, password);

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    logoutAdmin();

    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    saveAdminSession(token, updatedUser);
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      "useAdminAuth must be used inside AdminAuthProvider"
    );
  }

  return context;
}