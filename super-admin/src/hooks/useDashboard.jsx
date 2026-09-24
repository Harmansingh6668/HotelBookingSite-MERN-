import { useCallback, useEffect, useState } from "react";
import {
  getHotelCount,
  getHotels,
} from "../api/dashboard";

export function useDashboard() {
  const [data, setData] = useState({
    hotels: [],
    hotelCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [hotelsResponse, hotelCountResponse] =
        await Promise.all([
          getHotels(),
          getHotelCount(),
        ]);

      setData({
        hotels:
          hotelsResponse?.hotels ||
          hotelsResponse?.data ||
          [],
        hotelCount:
          hotelCountResponse?.count ??
          hotelCountResponse?.hotelCount ??
          0,
      });
    } catch (err) {
      console.error("Dashboard loading failed:", err);

      setError(
        err?.data?.message ||
          err?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    ...data,
    loading,
    error,
    refresh: loadDashboard,
  };
}