import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import PaymentProgress from "../components/payment/PaymentProgress";
import PaymentMethod from "../components/payment/PaymentMethod";
import FinalBookingSummary from "../components/payment/FinalBookingSummary";
import { createBooking } from "../services/api/booking";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const paymentMethods =
    booking?.hotel?.paymentMethods?.length > 0
      ? booking.hotel.paymentMethods
      : ["upi", "card", "netBanking"];

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#FAF8F2] py-12">
        <Container>
          <div className="rounded-[16px] border border-[#DDE5DF] bg-white p-8 text-center">
            <h1 className="text-xl font-semibold text-[#1F2925]">Booking details are missing</h1>
            <p className="mt-2 text-sm text-[#66736D]">Please return to the hotel and start the booking flow again.</p>
            <Link to="/search" className="mt-6 inline-block font-medium text-[#0B4F3A]">Back to search</Link>
          </div>
        </Container>
      </main>
    );
  }

  const handleContinue = async () => {
    if (!paymentMethod) return;
    const selectedRoom = booking.selectedRooms?.[0]?.room;
    const stay = booking.stay || {};

    if (!selectedRoom || !stay.checkIn || !stay.checkOut) {
      setError("Room and stay dates are required to complete the booking.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      const data = await createBooking({
        roomId: selectedRoom.id || selectedRoom._id,
        checkInDate: stay.checkIn,
        checkOutDate: stay.checkOut,
        guests: Number(stay.adults) || 1,
      });

      navigate("/booking-confirmation", {
        replace: true,
        state: {
          ...booking,
          paymentMethod,
          bookingId: data.booking._id,
          createdBooking: data.booking,
        },
      });
    } catch (submitError) {
      setError(submitError.message || "Unable to complete the booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F2] py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-6xl">
          <PaymentProgress />
          <h1 className="mt-5 text-2xl font-semibold text-[#1F2925]">Payment</h1>
          <p className="mt-2 text-sm text-[#66736D]">Choose how you would like to complete this reservation.</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold text-[#1F2925]">Payment method</h2>
              <div className="mt-5 space-y-3">
                {paymentMethods.map((method) => (
                  <PaymentMethod key={method} method={method} selected={paymentMethod === method} onSelect={setPaymentMethod} />
                ))}
              </div>
              <p className="mt-6 rounded-[10px] bg-[#F2F5F1] p-3 text-xs leading-5 text-[#66736D]">
                Payment availability and final charges are confirmed by the hotel booking system.
              </p>
              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              <button
                type="button"
                onClick={handleContinue}
                disabled={!paymentMethod || isSubmitting}
                className="mt-6 w-full rounded-[10px] bg-[#0B4F3A] px-4 py-3 text-sm font-medium text-white hover:bg-[#083D2D] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Completing booking..." : "Continue"}
              </button>
            </section>
            <FinalBookingSummary booking={booking} />
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Payment;