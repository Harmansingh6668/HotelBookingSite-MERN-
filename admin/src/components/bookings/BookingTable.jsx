import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles = {
  CONFIRMED:
    "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  PENDING:
    "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  CANCELLED:
    "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  COMPLETED:
    "bg-[var(--color-info)]/10 text-[var(--color-info)]",
};

const paymentStyles = {
  PAID:
    "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  PENDING:
    "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  FAILED:
    "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  REFUNDED:
    "bg-[var(--color-info)]/10 text-[var(--color-info)]",
};

function BookingTable({ bookings }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-white">
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                Booking
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                Guest
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                Room
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                Stay
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                Amount
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                Payment
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-surface-muted)]/50"
              >
                {/* Booking */}
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {booking.bookingId}
                  </p>

                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    {booking.createdAt}
                  </p>
                </td>

                {/* Guest */}
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {booking.guestName}
                  </p>

                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    {booking.guests}{" "}
                    {booking.guests === 1 ? "Guest" : "Guests"}
                  </p>
                </td>

                {/* Room */}
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    Room {booking.roomNumber}
                  </p>

                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    {booking.roomType}
                  </p>
                </td>

                {/* Stay */}
                <td className="px-5 py-4">
                  <p className="text-sm text-[var(--color-text-primary)]">
                    {booking.checkIn}
                  </p>

                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    to {booking.checkOut}
                  </p>

                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    {booking.nights}{" "}
                    {booking.nights === 1 ? "night" : "nights"}
                  </p>
                </td>

                {/* Amount */}
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    ₹{booking.amount.toLocaleString("en-IN")}
                  </p>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>

                {/* Payment */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${paymentStyles[booking.paymentStatus]}`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                {/* Action */}
                <td className="px-5 py-4 text-right">
                  <Link
                    to={`/bookings/${booking.id}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--color-border)] text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
                    title="View booking"
                  >
                    <Eye size={17} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="divide-y divide-[var(--color-border)] lg:hidden">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-4 sm:p-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {booking.bookingId}
                </p>

                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  {booking.createdAt}
                </p>
              </div>

              <Link
                to={`/bookings/${booking.id}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
              >
                <Eye size={17} />
              </Link>
            </div>

            {/* Guest */}
            <div className="mt-4">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {booking.guestName}
              </p>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {booking.guests}{" "}
                {booking.guests === 1 ? "Guest" : "Guests"}
              </p>
            </div>

            {/* Room + Stay */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Room
                </p>

                <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                  {booking.roomNumber} · {booking.roomType}
                </p>
              </div>

              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Amount
                </p>

                <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                  ₹{booking.amount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="mt-4">
              <p className="text-xs text-[var(--color-text-muted)]">
                Stay
              </p>

              <p className="mt-1 text-sm text-[var(--color-text-primary)]">
                {booking.checkIn} → {booking.checkOut}
              </p>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {booking.nights}{" "}
                {booking.nights === 1 ? "night" : "nights"}
              </p>
            </div>

            {/* Status */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[booking.status]}`}
              >
                {booking.status}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${paymentStyles[booking.paymentStatus]}`}
              >
                {booking.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            No bookings found
          </p>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default BookingTable;