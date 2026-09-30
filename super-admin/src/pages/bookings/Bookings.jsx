import {
  AlertCircle,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useBookings } from "../../hooks/useBookings";

function formatDate(value) {
  if (!value) return "Not available";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusClass(status) {
  return {
    CONFIRMED: "bg-emerald-50 text-emerald-700",
    COMPLETED: "bg-blue-50 text-blue-700",
    PENDING: "bg-amber-50 text-amber-700",
    CANCELLED: "bg-red-50 text-red-700",
  }[status] || "bg-slate-100 text-slate-600";
}

function Bookings() {
  const { bookings, loading, error, refresh } = useBookings();
  console.log("Bookings:", bookings, loading, error);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !query ||
        String(booking._id || "").toLowerCase().includes(query) ||
        booking.userId?.name?.toLowerCase().includes(query) ||
        booking.hotelId?.name?.toLowerCase().includes(query);

      const matchesStatus =
        status === "ALL" || booking.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, status]);

  const counts = {
    total: bookings.length,
    confirmed: bookings.filter(
      (booking) => booking.status === "CONFIRMED"
    ).length,
    pending: bookings.filter(
      (booking) => booking.status === "PENDING"
    ).length,
    cancelled: bookings.filter(
      (booking) => booking.status === "CANCELLED"
    ).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Platform Administration
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Bookings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor bookings across all hotels.
          </p>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={<CalendarCheck2 size={20} />} label="Total" value={counts.total} />
        <SummaryCard icon={<CheckCircle2 size={20} />} label="Confirmed" value={counts.confirmed} />
        <SummaryCard icon={<Clock3 size={20} />} label="Pending" value={counts.pending} />
        <SummaryCard icon={<XCircle size={20} />} label="Cancelled" value={counts.cancelled} />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search booking, guest or hotel..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-slate-400 focus:bg-white"
          />
        </div>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none"
        >
          <option value="ALL">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertCircle size={20} className="mt-0.5 text-red-600" />
          <div>
            <p className="font-semibold text-red-800">Unable to load bookings</p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
            <button type="button" onClick={refresh} className="mt-3 text-sm font-semibold text-red-800 underline">
              Try again
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="h-80 animate-pulse rounded-2xl bg-white" />
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {["Booking", "Guest", "Hotel", "Stay", "Amount", "Status", ""].map((heading) => (
                  <th key={heading} className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                    {String(booking._id).slice(-8).toUpperCase()}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-900">{booking.userId?.name || "Unknown guest"}</p>
                    <p className="text-xs text-slate-500">{booking.userId?.email || "No email"}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{booking.hotelId?.name || "Unknown hotel"}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                    ₹{Number(booking.totalAmount || 0).toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(booking.status)}`}>
                      {booking.status || "UNKNOWN"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link to={`/bookings/${booking._id}`} className="text-sm font-semibold text-emerald-700 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              No bookings match the selected filters.
            </div>
          )}
        </div>
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
        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default Bookings;
