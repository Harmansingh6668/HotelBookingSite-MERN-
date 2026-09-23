import { useEffect, useState } from "react";
import { Camera, Mail, Phone, User, Hotel } from "lucide-react";

import { useAdminAuth } from "../context/AdminAuthContext";
import { useHotel } from "../context/hotelContext";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../services/profile.service";

function Profile() {
  const { user, updateUser } = useAdminAuth();
  const { hotel } = useHotel();
  const [profile, setProfile] = useState({
    name: "Not available",
    email: "Not available",
    phone: "Not available",
    role: "Not available",
    hotel: "Not available",
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getAdminProfile();
        const currentUser = data.user || user;

        setProfile({
          name: currentUser?.name || "",
          email: currentUser?.email || "",
          phone: currentUser?.phone || "",
          role: currentUser?.role || "Not available",
          hotel: hotel?.name || "Not available",
        });
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [hotel, user]);

  const handleChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!profile.name.trim() || !profile.email.trim() || !profile.phone.trim()) {
      setError("Name, email, and phone are required.");
      setSaved(false);
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSaved(false);
      const data = await updateAdminProfile({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
      });

      const updatedUser = data.user;
      updateUser(updatedUser);
      setProfile((current) => ({
        ...current,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      }));
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "NA";

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--color-primary)]">
          ACCOUNT
        </p>

        <h1 className="mt-1 text-2xl font-semibold">
          Profile
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Manage your manager account information.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">

        {/* Cover */}
        <div className="h-32 bg-[var(--color-primary)] sm:h-40" />

        {/* Profile Content */}
        <div className="px-5 pb-6 sm:px-8">

          {/* Avatar */}
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">

            <div className="flex items-end gap-4">

              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[var(--color-surface-muted)] text-2xl font-semibold text-[var(--color-primary)] shadow-sm sm:h-28 sm:w-28">

                {initials}

                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-md hover:bg-[var(--color-primary-dark)]"
                >
                  <Camera size={16} />
                </button>

              </div>

              <div className="pb-1">

                <h2 className="text-xl font-semibold">
                  {profile.name}
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {profile.role}
                </p>

              </div>

            </div>

          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="mt-8">
            <div className="grid gap-5 md:grid-cols-2">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />

                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    handleChange("name", e.target.value)
                  }
                  className="w-full rounded-xl border border-[var(--color-border)] py-3 pl-10 pr-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
                  disabled={loading || saving}
                />

                </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />

                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                  className="w-full rounded-xl border border-[var(--color-border)] py-3 pl-10 pr-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
                  disabled={loading || saving}
                />

              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />

                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    handleChange("phone", e.target.value)
                  }
                  className="w-full rounded-xl border border-[var(--color-border)] py-3 pl-10 pr-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
                  disabled={loading || saving}
                />

              </div>
            </div>

            {/* Hotel */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Managed Hotel
              </label>

              <div className="relative">

                <Hotel
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />

                <input
                  type="text"
                  value={profile.hotel}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] py-3 pl-10 pr-4 text-sm text-[var(--color-text-secondary)] outline-none"
                />

              </div>

              <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">
                Hotel assignment is controlled by Aau Ji.
              </p>
            </div>

          </div>

          {/* Save */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            <button
              type="submit"
              disabled={loading || saving}
              className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {saved && (
              <span className="text-sm font-medium text-[var(--color-success)]">
                Changes saved successfully.
              </span>
            )}

          </div>

          </form>
        </div>

      </div>

    </div>
  );
}

export default Profile;