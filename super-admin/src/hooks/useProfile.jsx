import { useCallback, useEffect, useState } from "react";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../api/profile.api";

export function useProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCurrentUser();

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load profile"
        );
      }

      setUser(response.user);
    } catch (err) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveProfile = async (data) => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateCurrentUser(data);

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to update profile"
        );
      }

      setUser(response.user);
      setSuccess(
        response.message || "Profile updated successfully"
      );

      return response.user;
    } catch (err) {
      setError(err.message || "Failed to update profile");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    loading,
    saving,
    error,
    success,
    fetchProfile,
    saveProfile,
  };
}