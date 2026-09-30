import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  adminLogin,
  getAdminToken,
  getAdminUser,
  clearAdminSession  ,
} from "../services/api/adminAuth";
import { saveAdminSession } from "../services/api/storage";
import { ADMIN_SESSION_EXPIRED_EVENT } from "../services/api/client";

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

  const logout = useCallback(() => {

    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    window.addEventListener(ADMIN_SESSION_EXPIRED_EVENT, logout);
    return () => {
      window.removeEventListener(ADMIN_SESSION_EXPIRED_EVENT, logout);
    };
  }, [logout]);

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