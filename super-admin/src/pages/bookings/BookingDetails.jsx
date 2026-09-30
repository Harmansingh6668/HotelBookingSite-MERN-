import { Link, useParams } from "react-router-dom";
import { useBooking } from "../../hooks/useBookings";

function BookingDetails() {
  const { id } = useParams();
  const { booking, loading, error } = useBooking(id);

  if (loading) {
    return <div className="h-80 animate-pulse rounded-2xl bg-white" />;
  }

  if (error || !booking) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="font-semibold text-red-800">Booking not found</p>
        <p className="mt-1 text-sm text-red-700">{error || "The booking does not exist."}</p>
        <Link to="/bookings" className="mt-4 inline-block text-sm font-semibold text-red-800 underline">
          Back to bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/bookings" className="text-sm font-semibold text-emerald-700 hover:underline">
        ← Back to bookings
      </Link>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Booking ID</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">{booking._id}</h1>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {booking.status || "UNKNOWN"}
          </span>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Detail label="Guest" value={booking.userId?.name} />
          <Detail label="Email" value={booking.userId?.email} />
          <Detail label="Hotel" value={booking.hotelId?.name} />
          <Detail label="Total amount" value={`₹${Number(booking.totalAmount || 0).toLocaleString("en-IN")}`} />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value || "Not available"}</p>
    </div>
  );
}

export default BookingDetails;
