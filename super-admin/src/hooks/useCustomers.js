import { useCallback, useEffect, useState } from "react";
import {
  getCustomers,
  getCustomerById,
} from "../api/customer.api";

function normalizeCustomers(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.users)) {
    return response.users;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return [];
}

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomers();

      setCustomers(normalizeCustomers(response));
    } catch (err) {
      console.error("Failed to load customers:", err);

      setError(
        err?.data?.message ||
          err?.message ||
          "Failed to load customers."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  return {
    customers,
    loading,
    error,
    refresh: loadCustomers,
  };
}

export function useCustomer(id) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomer = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const response = await getCustomerById(id);

      setCustomer(response?.user || response?.data || null);
    } catch (err) {
      console.error("Failed to load customer:", err);

      setError(
        err?.data?.message ||
          err?.message ||
          "Failed to load customer."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  return {
    customer,
    loading,
    error,
    refresh: loadCustomer,
  };
}