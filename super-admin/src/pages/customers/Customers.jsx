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

import { useCustomers } from "../../hooks/useCustomers";
import CustomerCard from "../../components/customers/CustomerCard";

function Customers() {
  const {
    customers,
    loading,
    error,
    refresh,
  } = useCustomers();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.name?.toLowerCase().includes(query) ||
        customer.email?.toLowerCase().includes(query) ||
        customer.phone?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const activeCount = customers.filter(
    (customer) => customer.status === "ACTIVE"
  ).length;

  const pendingCount = customers.filter(
    (customer) => customer.status === "PENDING"
  ).length;

  const suspendedCount = customers.filter(
    (customer) => customer.status === "SUSPENDED"
  ).length;

  const verifiedCount = customers.filter(
    (customer) => customer.emailVerified
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Platform Administration
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Customers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and monitor customers registered on Aau Ji.
          </p>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={<Users size={20} />}
          label="Total Customers"
          value={customers.length}
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

      {/* Verified information */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-center gap-3">
          <CheckCircle2
            size={20}
            className="text-blue-600"
          />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              Email Verification
            </p>

            <p className="mt-0.5 text-xs text-blue-700">
              {verifiedCount} of {customers.length} customers
              have verified email addresses.
            </p>
          </div>
        </div>
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
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, email or phone..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none"
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
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertCircle
            size={20}
            className="mt-0.5 text-red-600"
          />

          <div>
            <p className="font-semibold text-red-800">
              Unable to load customers
            </p>

            <p className="mt-1 text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={refresh}
              className="mt-3 text-sm font-semibold text-red-800 underline"
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
              className="h-64 animate-pulse rounded-2xl bg-white"
            />
          ))}
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {filteredCustomers.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer._id || customer.id}
                  customer={customer}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Users
                  size={24}
                  className="text-slate-500"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No customers found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or status filter.
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

export default Customers;