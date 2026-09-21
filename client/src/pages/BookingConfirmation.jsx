import { Link, useLocation } from "react-router-dom";
import Container from "../components/ui/Container";
import ConfirmationCard from "../components/booking/ConfirmationCard";

function BookingConfirmation() {
  const location = useLocation();
  const booking = location.state;
  const bookingId = booking?.bookingId || `AJ-${new Date().getFullYear()}-0001`;

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#FAF8F2] py-12">
        <Container>
          <div className="rounded-[16px] border border-[#DDE5DF] bg-white p-8 text-center">
            <h1 className="text-xl font-semibold text-[#1F2925]">Booking confirmation unavailable</h1>
            <p className="mt-2 text-sm text-[#66736D]">Please complete a booking before viewing this page.</p>
            <Link to="/search" className="mt-6 inline-block font-medium text-[#0B4F3A]">Back to search</Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-2xl">
          <ConfirmationCard booking={booking} bookingId={bookingId} />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/profile" className="flex-1 rounded-[10px] bg-[#0B4F3A] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#083D2D]">
              View Profile
            </Link>
            {booking.bookingId && (
              <Link
                to={`/my-bookings/${booking.bookingId}`}
                className="flex-1 rounded-[10px] border border-[#0B4F3A] bg-white px-4 py-3 text-center text-sm font-medium text-[#0B4F3A] hover:bg-[#F2F5F1]"
              >
                Manage Booking
              </Link>
            )}
            <Link to="/" className="flex-1 rounded-[10px] border border-[#DDE5DF] bg-white px-4 py-3 text-center text-sm font-medium text-[#1F2925] hover:bg-[#F2F5F1]">
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default BookingConfirmation;