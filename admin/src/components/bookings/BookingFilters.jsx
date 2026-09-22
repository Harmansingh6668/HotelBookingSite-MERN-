import { Search, SlidersHorizontal, X } from "lucide-react";

function BookingFilters({
  search,
  setSearch,
  status,
  setStatus,
  paymentStatus,
  setPaymentStatus,
  dateFilter,
  setDateFilter,
  onClear,
}) {
  const hasFilters =
    search ||
    status !== "All" ||
    paymentStatus !== "All" ||
    dateFilter !== "All";

  return (
    <div className="rounded-[18px] border border-[var(--color-border)] bg-white p-4 sm:p-5">

      {/* Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search booking ID or guest name..."
            className="w-full rounded-[10px] border border-[var(--color-border)] bg-white py-2.5 pl-10 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
          />
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
          <SlidersHorizontal size={17} />
          <span>Filters</span>
        </div>

      </div>

      {/* Filter Controls */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

        {/* Booking Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-[10px] border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="All">All Booking Statuses</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PENDING">Pending</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Payment Status */}
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="rounded-[10px] border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="All">All Payment Statuses</option>
          <option value="PAID">Paid</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-[10px] border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="All">All Dates</option>
          <option value="Today">Today</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
        </select>

      </div>

      {/* Clear */}
      {hasFilters && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-danger)]"
          >
            <X size={16} />
            Clear filters
          </button>
        </div>
      )}

    </div>
  );
}

export default BookingFilters;