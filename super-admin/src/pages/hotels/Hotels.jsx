import {
  Building2,
  Filter,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import HotelCard from "../../components/hotels/HotelCard";
import { useHotels } from "../../hooks/useHotels";

function Hotels() {
  const {
    hotels,
    hotelCount,
    loading,
    error,
    refresh,
  } = useHotels();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredHotels = useMemo(() => {
    const query = search.trim().toLowerCase();

    return hotels.filter((hotel) => {
      const name =
        hotel?.name?.toLowerCase() || "";

      const city =
        hotel?.city?.toLowerCase() || "";

      const hotelStatus =
        hotel?.status || "ACTIVE";

      const matchesSearch =
        !query ||
        name.includes(query) ||
        city.includes(query);

      const matchesStatus =
        status === "ALL" ||
        hotelStatus === status;

      return matchesSearch && matchesStatus;
    });
  }, [hotels, search, status]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

        <div>
          <p className="text-sm font-medium text-emerald-800">
            Platform
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Hotels
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and monitor hotels registered on Aau Ji.
          </p>
        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={
                loading ? "animate-spin" : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <Plus size={17} />

            Add Hotel
          </button>

        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">

        <SummaryCard
          icon={Building2}
          label="Total Hotels"
          value={loading ? "..." : hotelCount}
        />

        <SummaryCard
          label="Active Hotels"
          value={
            loading
              ? "..."
              : hotels.filter(
                  (hotel) =>
                    hotel?.status === "ACTIVE"
                ).length
          }
        />

        <SummaryCard
          label="Inactive Hotels"
          value={
            loading
              ? "..."
              : hotels.filter(
                  (hotel) =>
                    hotel?.status !== "ACTIVE"
                ).length
          }
        />

      </div>

      {/* Filters */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search hotel or city..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />

          </div>

          {/* Status */}
          <div className="relative">

            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-600 outline-none focus:border-emerald-700 lg:w-44"
            >
              <option value="ALL">
                All Status
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>

          </div>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={refresh}
            className="mt-2 text-xs font-semibold text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {[1, 2, 3, 4, 5, 6].map(
            (item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-44 animate-pulse bg-slate-100" />

                <div className="space-y-3 p-5">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />

                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />

                  <div className="h-8 w-full animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            )
          )}

        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredHotels.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

          <Building2
            size={38}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 text-sm font-semibold text-slate-700">
            No hotels found
          </h3>

          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
            Try changing your search or status filter.
          </p>

        </div>
      )}

      {/* Hotels */}
      {!loading && filteredHotels.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel._id || hotel.id}
              hotel={hotel}
            />
          ))}

        </div>
      )}

    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex items-center gap-3">

        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
            <Icon size={19} />
          </div>
        )}

        <div>
          <p className="text-xs text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {value}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Hotels;