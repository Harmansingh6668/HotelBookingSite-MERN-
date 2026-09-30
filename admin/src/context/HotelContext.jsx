import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAdminHotel } from "../services/hotel.service";
import { useAdminAuth } from "./AdminAuthContext";

const HotelContext = createContext(null);

export function HotelProvider({ children }) {
  const { isAuthenticated } = useAdminAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHotel = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setHotel(null);

      const data = await getAdminHotel();

      setHotel(data.hotel);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    const timeoutId = window.setTimeout(() => {
      void fetchHotel();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchHotel, isAuthenticated]);

  return (
    <HotelContext.Provider
      value={{
        hotel: isAuthenticated ? hotel : null,
        loading: isAuthenticated && loading,
        error: isAuthenticated ? error : "",
        refreshHotel: fetchHotel,
        setHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);

  if (!context) {
    throw new Error("useHotel must be used inside HotelProvider");
  }

  return context;
}