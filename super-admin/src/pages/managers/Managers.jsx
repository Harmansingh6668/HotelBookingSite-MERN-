import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useManagers } from "../../hooks/useManagers";
import ManagerCard from "../../components/managers/ManagerCard";

function Managers() {
  const { managers, loading, error, refresh } = useManagers();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredManagers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return managers.filter((manager) => {
      const matchesSearch =
        !query ||
        manager.name?.toLowerCase().includes(query) ||
        manager.email?.toLowerCase().includes(query) ||
        manager.phone?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        manager.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [managers, search, statusFilter]);

  const activeCount = managers.filter(
    (manager) => manager.status === "ACTIVE"
  ).length;

  const pendingCount = managers.filter(
    (manager) => manager.status === "PENDING"
  ).length;

  const suspendedCount = managers.filter(
    (manager) => manager.status === "SUSPENDED"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Platform Administration
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Hotel Managers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage hotel administrators and their platform access.
          </p>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<Users size={20} />}
          label="Total Managers"
          value={managers.length}
        />

        <SummaryCard
          icon={<CheckCircle2 size={20} />}
          label="Active"
          value={activeCount}
        />

        <SummaryCard
          icon={<Clock3 size={20} />}
          label="Pending"
          value={pendingCount}
        />

        <SummaryCard
          icon={<ShieldAlert size={20} />}
          label="Suspended"
          value={suspendedCount}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email or phone..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />

          <div>
            <p className="font-semibold">
              Unable to load managers
            </p>

            <p className="mt-1 text-sm">{error}</p>

            <button
              type="button"
              onClick={refresh}
              className="mt-3 text-sm font-semibold underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      )}

      {/* Managers */}
      {!loading && !error && (
        <>
          {filteredManagers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredManagers.map((manager) => (
                <ManagerCard
                  key={manager._id || manager.id}
                  manager={manager}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Users size={24} className="text-slate-500" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No managers found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                No hotel administrators match your current search
                or filter.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default Managers;