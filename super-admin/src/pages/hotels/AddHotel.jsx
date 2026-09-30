import { useState } from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Globe,
  ArrowLeft,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  CircleAlert,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { createHotel } from "../../api/superAdmin.api";

const initialForm = {
  adminName: "",
  email: "",
  phone: "",
  password: "",

  hotelName: "",
  description: "",
  address: "",
  city: "",
  country: "",
};

function AddHotel() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.adminName.trim()) {
      return "Manager name is required";
    }

    if (!form.email.trim()) {
      return "Manager email is required";
    }

    if (!form.phone.trim()) {
      return "Manager phone number is required";
    }

    if (!form.password) {
      return "Manager password is required";
    }

    if (!form.hotelName.trim()) {
      return "Hotel name is required";
    }

    if (!form.description.trim()) {
      return "Hotel description is required";
    }

    if (!form.address.trim()) {
      return "Hotel address is required";
    }

    if (!form.city.trim()) {
      return "Hotel city is required";
    }

    if (!form.country.trim()) {
      return "Hotel country is required";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const response = await createHotel({
        adminName: form.adminName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,

        hotelName: form.hotelName.trim(),
        description: form.description.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        country: form.country.trim(),
      });

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to create hotel"
        );
      }

      setSuccess(
        response.message ||
          "Hotel and manager created successfully"
      );

      setForm(initialForm);

      /*
       * Give the user a moment to see the
       * success message before returning.
       */
      setTimeout(() => {
        navigate("/hotels");
      }, 1200);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while creating the hotel"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/hotels")}
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Hotels
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            Add New Hotel
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a hotel and assign its manager account.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

          <span>{success}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Hotel Information */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-50 p-2.5 text-green-700">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Hotel Information
                </h2>

                <p className="text-sm text-gray-500">
                  Basic information about the new property.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Hotel Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Hotel Name
              </label>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="hotelName"
                  value={form.hotelName}
                  onChange={handleChange}
                  placeholder="Enter hotel name"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the hotel, its location, and what guests can expect"
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter complete hotel address"
                  required
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Country
              </label>

              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Manager Information */}
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
                <User className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Hotel Manager Account
                </h2>

                <p className="text-sm text-gray-500">
                  These credentials will be used by the hotel
                  manager to access the admin panel.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Manager Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Manager Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="adminName"
                  value={form.adminName}
                  onChange={handleChange}
                  placeholder="Enter manager name"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Manager Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="manager@example.com"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
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
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Temporary Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create manager password"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-12 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Information */}
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
          <div className="flex gap-3">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

            <div className="text-sm text-blue-800">
              <p className="font-semibold">
                What happens after creation?
              </p>

              <p className="mt-1 leading-6">
                A new hotel will be created with an incomplete
                profile. The manager account will automatically
                be linked to this hotel and can complete the
                remaining hotel configuration from the Manager
                Panel.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/hotels")}
            disabled={loading}
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Hotel
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHotel;