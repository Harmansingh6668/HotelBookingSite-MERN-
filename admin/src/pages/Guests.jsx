import { useEffect, useMemo, useState } from "react";
import { Search, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getAdminBookings } from "../services/booking.service";

function getStatusClasses(status) {
  const styles = {
    CURRENT: "bg-green-50 text-[var(--color-success)]",
    UPCOMING: "bg-blue-50 text-[var(--color-info)]",
    PREVIOUS: "bg-gray-100 text-[var(--color-text-secondary)]",
  };

  return styles[status] || styles.PREVIOUS;
}

function Guests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const data = await getAdminBookings();
        const guestMap = new Map();
        const now = new Date();

        (data.bookings || []).forEach((booking) => {
          const user = booking.userId;
          if (!user?._id) return;

          const checkout = new Date(booking.checkOutDate);
          const checkin = new Date(booking.checkInDate);
          const bookingStatus =
            checkin > now
              ? "UPCOMING"
              : checkout >= now
                ? "CURRENT"
                : "PREVIOUS";
          const existing = guestMap.get(user._id);

          if (existing) {
            existing.bookings += 1;
            existing.totalSpent += booking.totalAmount || 0;
            if (checkout > existing.lastStayDate) {
              existing.lastStayDate = checkout;
              existing.lastStay = checkout.toLocaleDateString("en-IN");
              existing.status = bookingStatus;
            }
            return;
          }

          guestMap.set(user._id, {
            id: user._id,
            name: user.name || "Not available",
            email: user.email || "Not available",
            phone: user.phone || "Not available",
            bookings: 1,
            lastStay: Number.isNaN(checkout.getTime())
              ? "Not available"
              : checkout.toLocaleDateString("en-IN"),
            lastStayDate: checkout,
            totalSpent: booking.totalAmount || 0,
            status: bookingStatus,
          });
        });

        setGuests([...guestMap.values()]);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const searchMatch =
        guest.name.toLowerCase().includes(search.toLowerCase()) ||
        guest.email.toLowerCase().includes(search.toLowerCase()) ||
        guest.phone.includes(search);

      const statusMatch =
        status === "All" || guest.status === status;

      return searchMatch && statusMatch;
    });
  }, [guests, search, status]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--color-primary)]">
          RESERVATIONS
        </p>

        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              Guests
            </h1>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              View and manage guests who have stayed or booked at your hotel.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Total Guests
            </p>

            <Users
              size={20}
              className="text-[var(--color-primary)]"
            />
          </div>

          <p className="mt-3 text-2xl font-semibold">
            {guests.length || 0}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Current Guests
          </p>

          <p className="mt-3 text-2xl font-semibold">
            {guests.filter((guest) => guest.status === "CURRENT").length || 0}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Returning Guests
          </p>

          <p className="mt-3 text-2xl font-semibold">
            {guests.filter((guest) => guest.bookings > 1).length || 0}
          </p>
        </div>

        {error && (
          <p className="text-sm text-[var(--color-danger)]">
            Unable to load guests: {error}
          </p>
        )}

      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-4">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
            />

            <input
              type="text"
              placeholder="Search by guest name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]"
          >
            <option value="All">All Guests</option>
            <option value="CURRENT">Current Guests</option>
            <option value="UPCOMING">Upcoming Guests</option>
            <option value="PREVIOUS">Previous Guests</option>
          </select>

        </div>

      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white md:block">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Guest
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Contact
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Bookings
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Last Stay
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Total Spent
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {!loading && filteredGuests.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-muted)]/50"
                >

                  <td className="px-6 py-4">
                    <p className="font-medium">
                      {guest.name}
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      Guest #{guest.id}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm">
                      {guest.email}
                    </p>

                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                      {guest.phone}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {guest.bookings}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {guest.lastStay}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    ₹{guest.totalSpent.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                        guest.status
                      )}`}
                    >
                      {guest.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      to={`/guests/${guest.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </td>

                </tr>
              ))}
              {loading && (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-sm text-[var(--color-text-secondary)]">
                    Loading guests...
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">

        {!loading && filteredGuests.map((guest) => (
          <div
            key={guest.id}
            className="rounded-2xl border border-[var(--color-border)] bg-white p-4"
          >

            <div className="flex items-start justify-between gap-3">

              <div>
                <p className="font-semibold">
                  {guest.name}
                </p>

                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  {guest.email}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                  guest.status
                )}`}
              >
                {guest.status}
              </span>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Bookings
                </p>
                <p className="mt-1 font-medium">
                  {guest.bookings}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Total Spent
                </p>
                <p className="mt-1 font-medium">
                  ₹{guest.totalSpent.toLocaleString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Phone
                </p>
                <p className="mt-1">
                  {guest.phone}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Last Stay
                </p>
                <p className="mt-1">
                  {guest.lastStay}
                </p>
              </div>

            </div>

            <Link
              to={`/guests/${guest.id}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
            >
              <Eye size={16} />
              View Guest
            </Link>

          </div>
        ))}

      </div>

      {/* Empty state */}
      {filteredGuests.length === 0 && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-10 text-center">
          <Users
            size={32}
            className="mx-auto text-[var(--color-text-muted)]"
          />

          <p className="mt-3 font-medium">
            No guests found
          </p>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Try changing your search or filters.
        </p>
        </div>
      )}

    </div>
  );
}

export default Guests;