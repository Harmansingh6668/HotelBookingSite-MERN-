import { useCallback, useEffect, useState } from "react";
import {
  getBookingById,
  getBookings,
} from "../api/booking.api";

function normalizeBookings(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.bookings)) {
    return response.bookings;
  }

  return [];
}

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBookings();
      setBookings(normalizeBookings(response));
    } catch (err) {
      console.error("Failed to load bookings:", err);
      setError(
        err?.data?.message ||
          err?.message ||
          "Unable to load bookings."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);
console.log("Bookings:", bookings, loading, error);
  return {
    bookings,
    loading,
    error,
    refresh: loadBookings,
  };
}

export function useBooking(id) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getBookingById(id);

        if (active) {
          setBooking(response?.booking || null);
        }
      } catch (err) {
        if (active) {
          setError(
            err?.data?.message ||
              err?.message ||
              "Unable to load booking."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadBooking();

    return () => {
      active = false;
    };
  }, [id]);

  return { booking, loading, error };
}
