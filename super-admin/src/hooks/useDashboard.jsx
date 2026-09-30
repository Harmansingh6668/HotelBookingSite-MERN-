import { useCallback, useEffect, useState } from "react";
import {
  getDashboardStatistics,
  getHotels,
} from "../api/dashboard";

export function useDashboard() {
  const [data, setData] = useState({
    hotels: [],
    hotelCount: 0,
    bookingCount: 0,
    customerCount: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardResponse, hotelsResponse] =
        await Promise.all([
          getDashboardStatistics(),
          getHotels(),
        ]);

      const dashboard = dashboardResponse?.dashboard || {};

      setData({
        hotels:
          hotelsResponse?.hotels ||
          hotelsResponse?.data ||
          [],
        hotelCount: dashboard.hotels?.total ?? 0,
        bookingCount: dashboard.bookings?.total ?? 0,
        customerCount: dashboard.customers?.total ?? 0,
        revenue: dashboard.revenue?.total ?? 0,
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