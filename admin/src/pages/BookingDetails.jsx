import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  UserRound,
} from "lucide-react";
import { getAdminBookingById } from "../services/booking.service";

const statusStyles = {
  CONFIRMED: "bg-[#EAF5EF] text-[var(--color-success)]",
  PENDING: "bg-[#FFF6E5] text-[var(--color-warning)]",
  CANCELLED: "bg-[#FBEAEA] text-[var(--color-danger)]",
  COMPLETED: "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]",
};

function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminBookingById(id)
      .then(({ booking: data }) => {
        const firstRoom = data.rooms?.[0];
        setBooking({
          bookingId: data._id,
          guestName: data.userId?.name || "Unknown guest",
          guests: data.rooms?.reduce((total, room) => total + (room.guests || 0), 0) || 0,
          roomNumber: firstRoom?.roomId?.roomNumber || "N/A",
          roomType: firstRoom?.roomId?.roomType || "N/A",
          checkIn: new Date(data.checkInDate).toLocaleDateString("en-IN"),
          checkOut: new Date(data.checkOutDate).toLocaleDateString("en-IN"),
          nights: data.totalNights || 0,
          amount: data.totalAmount || 0,
          status: data.status,
          paymentStatus: data.paymentStatus || "N/A",
          createdAt: new Date(data.createdAt).toLocaleDateString("en-IN"),
        });
      })
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-sm text-[var(--color-text-secondary)]">Loading booking...</p>;

  if (error || !booking) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
          {error || "Booking not found"}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          The booking you are trying to view does not exist.
        </p>
        <Link
          to="/bookings"
          className="mt-5 inline-flex rounded-[10px] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white"
        >
          Back to bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] space-y-6">
      <Link
        to="/bookings"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
      >
        <ArrowLeft size={17} />
        Back to bookings
      </Link>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[var(--color-gold)]">
            Reservation
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)] sm:text-3xl">
            Booking {booking.bookingId}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Created on {booking.createdAt}
          </p>
        </div>
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
            statusStyles[booking.status] || statusStyles.PENDING
          }`}
        >
          {booking.status}
        </span>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Guest and room
          </h2>
          <div className="mt-5 space-y-5">
            <div className="flex items-start gap-3">
              <UserRound className="text-[var(--color-primary)]" size={19} />
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Guest</p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                  {booking.guestName}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {booking.guests} guest{booking.guests === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="text-[var(--color-primary)]" size={19} />
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Stay</p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                  {booking.checkIn} → {booking.checkOut}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {booking.nights} night{booking.nights === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">Room</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                Room {booking.roomNumber} · {booking.roomType}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Payment summary
          </h2>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">Total amount</span>
              <span className="text-xl font-semibold text-[var(--color-text-primary)]">
                ₹{booking.amount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-sm">
              <span className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <CreditCard size={17} />
                Payment status
              </span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {booking.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookingDetails;
