import { useCallback, useEffect, useState } from "react";
import {
  getHotels,
  getHotelCount,
} from "../api/hotel.api";

function normalizeHotels(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.hotels)) {
    return response.hotels;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
}

export function useHotels() {
  const [hotels, setHotels] = useState([]);
  const [hotelCount, setHotelCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHotels = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [hotelsResponse, countResponse] =
        await Promise.all([
          getHotels(),
          getHotelCount(),
        ]);

      const normalizedHotels =
        normalizeHotels(hotelsResponse);

      setHotels(normalizedHotels);

      const count =
        countResponse?.count ??
        countResponse?.hotelCount ??
        normalizedHotels.length;

      setHotelCount(count);
    } catch (err) {
      console.error("Failed to load hotels:", err);

      setError(
        err?.data?.message ||
          err?.message ||
          "Unable to load hotels."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  return {
    hotels,
    hotelCount,
    loading,
    error,
    refresh: fetchHotels,
  };
}