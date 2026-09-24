import { useCallback, useEffect, useState } from "react";
import {
  getManagers,
  getManagerById,
} from "../api/manager.api";

function normalizeManagers(response) {
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

export function useManagers() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadManagers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getManagers();
      const normalized = normalizeManagers(response);

      setManagers(normalized);
    } catch (err) {
      console.error("Failed to load managers:", err);

      setError(
        err?.data?.message ||
          err?.message ||
          "Failed to load managers."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadManagers();
  }, [loadManagers]);

  return {
    managers,
    loading,
    error,
    refresh: loadManagers,
  };
}

export function useManager(id) {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadManager = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const response = await getManagerById(id);

      setManager(response?.user || response?.data || null);
    } catch (err) {
      console.error("Failed to load manager:", err);

      setError(
        err?.data?.message ||
          err?.message ||
          "Failed to load manager."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadManager();
  }, [loadManager]);

  return {
    manager,
    loading,
    error,
    refresh: loadManager,
  };
}