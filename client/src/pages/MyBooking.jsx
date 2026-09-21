import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import LoadingState from "../components/ui/LoadingState";
import { cancelBooking, getBookingById } from "../services/api/booking";

function formatDate(value) {
  if (!value) return "Not scheduled";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function getStatusClass(status) {
  if (status === "CANCELLED") return "bg-[#FBEAEA] text-[#B64A4A]";
  if (status === "COMPLETED") return "bg-[#F2F5F1] text-[#66736D]";
  if (status === "CONFIRMED") return "bg-[#E7F3EC] text-[#2F7D5A]";
  return "bg-[#FFF4D9] text-[#9A6B1F]";
}

function MyBooking() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getBookingById(bookingId);
        setBooking(data.booking);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setIsCancelling(true);
      setCancelError("");
      const data = await cancelBooking(bookingId);
      setBooking(data.booking);
    } catch (cancelRequestError) {
      setCancelError(
        cancelRequestError.message || "Unable to cancel this booking."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F2] py-12">
        <Container>
          <LoadingState message="Loading booking details..." />
        </Container>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="min-h-screen bg-[#FAF8F2] py-12">
        <Container>
          <div className="rounded-[16px] border border-[#DDE5DF] bg-white p-8 text-center">
            <h1 className="text-xl font-semibold text-[#1F2925]">
              Booking details unavailable
            </h1>
            <p className="mt-2 text-sm text-red-600">
              {error || "Booking not found."}
            </p>
            <Link
              to="/profile"
              className="mt-6 inline-block font-medium text-[#0B4F3A]"
            >
              Back to profile
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const hotel = booking.hotelId || {};
  const room = booking.roomId || {};
  const canCancel = !["CANCELLED", "COMPLETED"].includes(booking.status);

  return (
    <main className="min-h-screen bg-[#FAF8F2] py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link to="/profile" className="text-sm font-medium text-[#0B4F3A]">
            ← Back to profile
          </Link>

          <div className="mt-6 rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#DDE5DF] pb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-[#C8922E]">
                  Booking details
                </p>
                <h1 className="mt-2 text-2xl font-semibold text-[#1F2925]">
                  {hotel.name || "Hotel stay"}
                </h1>
                <p className="mt-1 text-sm text-[#66736D]">
                  Booking reference: {booking._id}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-[#8A958F]">Location</p>
                <p className="mt-1 font-medium text-[#1F2925]">
                  {[hotel.address, hotel.city].filter(Boolean).join(", ") ||
                    "Location unavailable"}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8A958F]">Room</p>
                <p className="mt-1 font-medium text-[#1F2925]">
                  {room.roomType || "Room"}{" "}
                  {room.roomNumber ? `· Room ${room.roomNumber}` : ""}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8A958F]">Check-in</p>
                <p className="mt-1 font-medium text-[#1F2925]">
                  {formatDate(booking.checkInDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8A958F]">Check-out</p>
                <p className="mt-1 font-medium text-[#1F2925]">
                  {formatDate(booking.checkOutDate)}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[12px] bg-[#F2F5F1] p-5">
              <div className="flex flex-wrap justify-between gap-3 text-sm">
                <span className="text-[#66736D]">Guests</span>
                <span className="font-medium text-[#1F2925]">
                  {booking.guests} guest{booking.guests === 1 ? "" : "s"}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-3 text-sm">
                <span className="text-[#66736D]">Stay length</span>
                <span className="font-medium text-[#1F2925]">
                  {booking.totalNights} night{booking.totalNights === 1 ? "" : "s"}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-3 border-t border-[#DDE5DF] pt-3">
                <span className="font-medium text-[#66736D]">Total amount</span>
                <span className="text-lg font-semibold text-[#1F2925]">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-3 text-sm">
                <span className="text-[#66736D]">Payment status</span>
                <span className="font-medium text-[#1F2925]">
                  {booking.paymentStatus}
                </span>
              </div>
            </div>

            {cancelError && (
              <p className="mt-5 text-sm text-red-600">{cancelError}</p>
            )}

            {canCancel ? (
              <button
                type="button"
                onClick={handleCancel}
                disabled={isCancelling}
                className="mt-6 rounded-[10px] border border-[#B64A4A] px-4 py-2.5 text-sm font-medium text-[#B64A4A] hover:bg-[#FBEAEA] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCancelling ? "Cancelling booking..." : "Cancel booking"}
              </button>
            ) : (
              <p className="mt-6 text-sm text-[#66736D]">
                {booking.status === "CANCELLED"
                  ? "This booking has been cancelled."
                  : "Completed bookings cannot be cancelled."}
              </p>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}

export default MyBooking;
