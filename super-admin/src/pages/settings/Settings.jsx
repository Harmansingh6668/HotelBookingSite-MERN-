import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CircleCheck,
  CircleAlert,
  Building2,
  Save,
  RefreshCw,
} from "lucide-react";

import { useProfile } from "../../hooks/useProfile";

function Settings() {
  const {
    user,
    loading,
    saving,
    error,
    success,
    saveProfile,
  } = useProfile();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await saveProfile({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <RefreshCw className="h-5 w-5 animate-spin" />
          Loading settings...
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-3 text-red-700">
          <CircleAlert className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your Super Admin profile and account information.
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <CircleAlert className="h-5 w-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CircleCheck className="h-5 w-5" />
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Profile */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-50 p-2.5 text-green-700">
                <User className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Profile Information
                </h2>

                <p className="text-sm text-gray-500">
                  Update the information associated with your account.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end border-t border-gray-100 pt-5">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Account */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Account
                </h2>

                <p className="text-sm text-gray-500">
                  Account information and access level.
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Role */}
            <div className="px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Role
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {user?.role || "—"}
              </p>
            </div>

            {/* Status */}
            <div className="px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Account Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  user?.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : user?.status === "SUSPENDED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {user?.status || "UNKNOWN"}
              </span>
            </div>

            {/* Email verification */}
            <div className="px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Email Verification
              </p>

              <div className="mt-2 flex items-center gap-2">
                {user?.emailVerified ? (
                  <>
                    <CircleCheck className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Verified
                    </span>
                  </>
                ) : (
                  <>
                    <CircleAlert className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700">
                      Not Verified
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Hotel */}
            {user?.hotelId && (
              <div className="px-6 py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Assigned Hotel
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-900">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  {user.hotelId}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security notice */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />

          <div>
            <h3 className="font-semibold text-gray-900">
              Account Security
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Your role, account status, and verification state are
              controlled by the backend and cannot be changed from this
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;