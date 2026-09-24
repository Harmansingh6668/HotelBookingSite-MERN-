import {
  ArrowUpRight,
  Building2,
  CalendarCheck2,
  CircleDollarSign,
  RefreshCw,
  Users,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../hooks/useDashboard";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
          <Icon size={21} />
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-300"
        />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();

  const {
    hotels,
    hotelCount,
    loading,
    error,
    refresh,
  } = useDashboard();

  const name =
    user?.name ||
    user?.email?.split("@")[0] ||
    "Super Admin";

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-emerald-800">
            Overview
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {name}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening across Aau Ji.
          </p>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">
            {error}
          </p>

          <button
            onClick={refresh}
            className="text-sm font-semibold text-red-700 underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Hotels"
          value={
            loading
              ? "..."
              : hotelCount
          }
          description="Hotels on Aau Ji"
          icon={Building2}
        />

        <StatCard
          title="Total Bookings"
          value="—"
          description="All platform bookings"
          icon={CalendarCheck2}
        />

        <StatCard
          title="Customers"
          value="—"
          description="Registered customers"
          icon={Users}
        />

        <StatCard
          title="Revenue"
          value="—"
          description="Platform revenue"
          icon={CircleDollarSign}
        />

      </div>

      {/* Main */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">

        {/* Hotels */}
        <div className="rounded-2xl border border-slate-200 bg-white xl:col-span-2">

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="font-semibold text-slate-900">
                Hotels
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Hotels currently available in the platform
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {hotelCount} total
            </span>
          </div>

          <div className="divide-y divide-slate-100">

            {loading && (
              <>
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 px-6 py-5"
                  >
                    <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100" />

                    <div className="flex-1">
                      <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />

                      <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                ))}
              </>
            )}

            {!loading && hotels.length === 0 && (
              <div className="px-6 py-12 text-center">
                <Building2
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  No hotels found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Hotels will appear here once they are added.
                </p>
              </div>
            )}

            {!loading &&
              hotels.slice(0, 5).map((hotel) => (
                <div
                  key={hotel._id || hotel.id}
                  className="flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <Building2 size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {hotel.name || "Unnamed Hotel"}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-400">
                      {hotel.city ||
                        hotel.location ||
                        "Location unavailable"}
                    </p>
                  </div>

                  <span
                    className={`
                      rounded-full px-2.5 py-1 text-[10px] font-semibold
                      ${
                        hotel.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    {hotel.status || "ACTIVE"}
                  </span>
                </div>
              ))}

          </div>

        </div>

        {/* Platform status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="font-semibold text-slate-900">
            Platform Status
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Current system overview
          </p>

          <div className="mt-6 space-y-4">

            <StatusRow
              label="Authentication"
              status="Operational"
            />

            <StatusRow
              label="Hotel service"
              status="Operational"
            />

            <StatusRow
              label="Database"
              status="Operational"
            />

            <StatusRow
              label="Booking service"
              status="Pending API"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

function StatusRow({ label, status }) {
  const operational = status === "Operational";

  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-slate-600">
        {label}
      </span>

      <span
        className={`
          rounded-full px-2.5 py-1 text-[10px] font-semibold
          ${
            operational
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }
        `}
      >
        {status}
      </span>
    </div>
  );
}

export default Dashboard;