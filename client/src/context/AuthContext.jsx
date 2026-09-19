import { useEffect, useState } from "react";
import AuthContext from "./authContext";
import { getAuthToken, getAuthUser } from "../services/auth/authService";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => ({
    token: getAuthToken(),
    user: getAuthUser(),
  }));

  useEffect(() => {
    const syncSession = () => {
      setSession({
        token: getAuthToken(),
        user: getAuthUser(),
      });
    };

    window.addEventListener("aauji-auth-change", syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener("aauji-auth-change", syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...session,
        isAuthenticated: Boolean(session.token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
