import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  Shield,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useManager } from "../../hooks/useManagers";
import { getHotelById } from "../../api/hotel.api";

function ManagerDetails() {
  const { id } = useParams();

  const {
    manager,
    loading,
    error,
  } = useManager(id);

  const [hotel, setHotel] = useState(null);
  const [hotelLoading, setHotelLoading] = useState(false);

  useEffect(() => {
    const loadHotel = async () => {
      if (!manager?.hotelId) {
        setHotel(null);
        return;
      }

      try {
        setHotelLoading(true);

        const response = await getHotelById(manager.hotelId);

        setHotel(response?.hotel || response?.data || null);
      } catch (err) {
        console.error("Failed to load manager hotel:", err);
        setHotel(null);
      } finally {
        setHotelLoading(false);
      }
    };

    loadHotel();
  }, [manager]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-5">
        <div className="h-8 w-48 rounded bg-slate-200" />
        <div className="h-72 rounded-2xl bg-white" />
      </div>
    );
  }

  if (error || !manager) {
    return (
      <div className="space-y-5">
        <Link
          to="/managers"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Managers
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">
            Manager not found
          </h2>

          <p className="mt-1 text-sm text-red-700">
            {error || "The requested manager could not be found."}
          </p>
        </div>
      </div>
    );
  }

  const status = manager.status || "UNKNOWN";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/managers"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Managers
        </Link>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
              {manager.name
                ?.split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {manager.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Hotel Administrator
              </p>
            </div>
          </div>

          <StatusBadge status={status} />
        </div>
      </div>

      {/* Manager information */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <UserRound size={19} className="text-slate-500" />

            <h2 className="font-semibold text-slate-900">
              Manager Information
            </h2>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<UserRound size={17} />}
              label="Full Name"
              value={manager.name}
            />

            <InfoItem
              icon={<Mail size={17} />}
              label="Email"
              value={manager.email}
            />

            <InfoItem
              icon={<Phone size={17} />}
              label="Phone"
              value={manager.phone}
            />

            <InfoItem
              icon={<Shield size={17} />}
              label="Role"
              value={manager.role}
            />

            <InfoItem
              icon={<CheckCircle2 size={17} />}
              label="Email Verified"
              value={
                manager.emailVerified
                  ? "Verified"
                  : "Not Verified"
              }
            />

            <InfoItem
              icon={<Clock3 size={17} />}
              label="Account Status"
              value={manager.status}
            />

            <InfoItem
              icon={<UserRound size={17} />}
              label="Manager ID"
              value={manager._id || manager.id}
            />

            <InfoItem
              icon={<Building2 size={17} />}
              label="Hotel ID"
              value={manager.hotelId || "Not assigned"}
            />
          </div>
        </section>

        {/* Hotel assignment */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Building2 size={19} className="text-slate-500" />

            <h2 className="font-semibold text-slate-900">
              Assigned Hotel
            </h2>
          </div>

          <div className="mt-5">
            {!manager.hotelId ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                <Building2
                  size={24}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  No hotel assigned
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  This manager currently has no hotel linked.
                </p>
              </div>
            ) : hotelLoading ? (
              <div className="space-y-3">
                <div className="h-6 animate-pulse rounded bg-slate-200" />
                <div className="h-4 animate-pulse rounded bg-slate-200" />
              </div>
            ) : hotel ? (
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {hotel.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {hotel.city ||
                    hotel.location ||
                    hotel.address ||
                    "Location unavailable"}
                </p>

                <Link
                  to={`/hotels/${hotel._id || hotel.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View Hotel
                </Link>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Hotel information could not be loaded.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Account information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">
          Account Information
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <InfoItem
            icon={<CalendarDays size={17} />}
            label="Created"
            value={formatDate(manager.createdAt)}
          />

          <InfoItem
            icon={<CalendarDays size={17} />}
            label="Last Updated"
            value={formatDate(manager.updatedAt)}
          />
        </div>
      </section>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        {icon}
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-medium text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const classes = {
    ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    SUSPENDED: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${
        classes[status] ||
        "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default ManagerDetails;