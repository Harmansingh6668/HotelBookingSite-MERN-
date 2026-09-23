import { createContext, useContext, useEffect, useState } from "react";
import { getAdminHotel } from "../services/hotel.service";

const HotelContext = createContext(null);

export function HotelProvider({ children }) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHotel = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminHotel();

      setHotel(data.hotel);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <HotelContext.Provider
      value={{
        hotel,
        loading,
        error,
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