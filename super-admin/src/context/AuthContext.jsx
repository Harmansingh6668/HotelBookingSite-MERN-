import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi } from "../api/auth.api";

const AuthContext = createContext(null);

const TOKEN_KEY = "aauji_auth_token";
const USER_KEY = "aauji_auth_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY);

    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await loginApi({
      email,
      password,
    });

    /*
      Your backend may return the token/user using slightly
      different property names. Adjust these two lines if needed.
    */
    const receivedToken = response.token;
    const receivedUser = response.user;

    if (!receivedToken) {
      throw new Error("Authentication token was not returned.");
    }

    if (!receivedUser) {
      throw new Error("User information was not returned.");
    }

    // Critical security check for this frontend
    if (receivedUser.role !== "SUPER_ADMIN") {
      throw new Error(
        "Access denied. This account is not a Super Admin."
      );
    }

    localStorage.setItem(TOKEN_KEY, receivedToken);
    localStorage.setItem(USER_KEY, JSON.stringify(receivedUser));

    setToken(receivedToken);
    setUser(receivedUser);

    return receivedUser;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}