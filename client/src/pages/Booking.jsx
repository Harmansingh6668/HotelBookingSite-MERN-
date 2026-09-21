import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import MissingFieldsModal from "../components/missingModel/MissingFeildModal";
import { useFormValidation } from "../components/missingModel/useFormValidation";
import { useBooking } from "../context/BookingContext";
import { calculateBookingPrice } from "../utils/booking/calculateBookingPrice";
function Booking() {
  const location = useLocation();
  const { booking: contextBooking, setBooking } = useBooking();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const routeBooking = location.state;
  const routeStay = routeBooking?.stay || {};
  const routeSelectedRooms = routeBooking?.selectedRooms || [];
  const contextSelectedRooms = contextBooking.selectedRooms || [];
  const selectedRoomsWithDetails = routeSelectedRooms.some(
    (selection) => selection.room
  )
    ? routeSelectedRooms
    : contextSelectedRooms;
  const booking = {
    ...routeBooking,
    ...contextBooking,
    hotel: contextBooking.hotel || routeBooking?.hotel,
    selectedRooms: selectedRoomsWithDetails,
    pricing: contextBooking.pricing || routeBooking?.pricing,
  };
  const search = {
    destination: contextBooking.search.destination || routeStay.destination || "",
    checkIn: contextBooking.search.checkIn || routeStay.checkIn || "",
    checkOut: contextBooking.search.checkOut || routeStay.checkOut || "",
    adults: contextBooking.search.adults || routeStay.adults || "2",
    rooms: contextBooking.search.rooms || routeStay.rooms || "1",
  };
  const selectedRooms = useMemo(
    () =>
      booking.selectedRooms
        .map((selection) => {
          if (selection.room) return selection;
          const room = booking.hotel?.rooms?.find(
            (hotelRoom) => hotelRoom.id === selection.roomId
          );
          return room ? { room, quantity: selection.quantity } : null;
        })
        .filter(Boolean),
    [booking.selectedRooms, booking.hotel]
  );
  const pricingInput = useMemo(
    () =>
      selectedRooms.map(({ room, quantity }) => ({
        roomId: room.id,
        quantity,
        pricePerNight: room.price,
      })),
    [selectedRooms]
  );
  const pricingKey = JSON.stringify({
    checkIn: search.checkIn || "",
    checkOut: search.checkOut || "",
    selectedRooms: pricingInput,
  });

  useEffect(() => {
    if (!search.checkIn || !search.checkOut || !pricingInput.length) return;

    const nextPricing = calculateBookingPrice({
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      selectedRooms: pricingInput,
    });

    setBooking((currentBooking) => {
      const currentPricing = currentBooking.pricing;
      const isSamePricing =
        currentPricing &&
        JSON.stringify(currentPricing) === JSON.stringify(nextPricing);

      return isSamePricing
        ? currentBooking
        : { ...currentBooking, pricing: nextPricing };
    });
  }, [pricingKey, pricingInput, search.checkIn, search.checkOut, setBooking]);

  const pricing = booking.pricing || calculateBookingPrice({
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    selectedRooms: pricingInput,
  });
  const hotelId = booking.hotel?.id;
  const returnToHotel = hotelId
    ? `/hotel/${hotelId}?${searchParams.toString()}`
    : "/";
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [touchedFields, setTouchedFields] = useState({});
  const { missingFields, isModalOpen, closeModal, validateForm } =
    useFormValidation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleBlur = (event) => {
    setTouchedFields((current) => ({ ...current, [event.target.name]: true }));
  };

  const getFieldError = (name) => {
    const value = formData[name];
    if (!touchedFields[name]) return "";
    if (!value.trim()) return "This field is required.";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address.";
    }
    if (name === "phone" && !/^[+\d][\d\s()-]{7,}$/.test(value)) {
      return "Please enter a valid phone number.";
    }
    return "";
  };
  const hasValidContactDetails =
    formData.fullName.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    /^[+\d][\d\s()-]{7,}$/.test(formData.phone);

  const handleContinueToPayment = () => {
    setTouchedFields({
      fullName: true,
      email: true,
      phone: true,
    });
    const isValid = validateForm(formData, {
      fullName: "Full name",
      email: "Email address",
      phone: "Phone number",
    });

    if (!isValid) return;

    navigate(`/payment?${searchParams.toString()}`, {
      state: {
        ...booking,
        booker: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },
        specialRequests: formData.specialRequests.trim(),
        stay: {
          destination: search.destination || "",
          checkIn: search.checkIn || "",
          checkOut: search.checkOut || "",
          adults: search.adults || "2",
          rooms: search.rooms || "1",
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#FAF8F2] py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium sm:text-sm">
              <span className="text-[#2F7D5A]">✓ Stay confirmed</span>
              <span className="text-[#8A958F]">→</span>
              <span className="rounded-full bg-[#0B4F3A] px-3 py-1.5 text-white">② Your details</span>
              <span className="text-[#8A958F]">→</span>
              <span className="text-[#8A958F]">③ Payment</span>
            </div>
            <h1 className="mt-5 text-2xl font-semibold text-[#1F2925]">Booking details</h1>
            <p className="mt-2 text-sm text-[#66736D]">
              Enter the details of the person responsible for this reservation.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold text-[#1F2925]">Contact / Booker Details</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="text-sm font-medium text-[#1F2925]">Full name <span className="text-[#B64A4A]">*</span></span>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="name"
                  required
                  className={`mt-1 w-full rounded-[10px] border px-4 py-3 text-sm outline-none focus:border-[#0B4F3A] ${getFieldError("fullName") ? "border-[#B64A4A]" : "border-[#DDE5DF]"}`}
                />
                {getFieldError("fullName") && <span className="mt-1 block text-xs text-[#B64A4A]">{getFieldError("fullName")}</span>}
              </label>
              <label>
                <span className="text-sm font-medium text-[#1F2925]">Email <span className="text-[#B64A4A]">*</span></span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  required
                  className={`mt-1 w-full rounded-[10px] border px-4 py-3 text-sm outline-none focus:border-[#0B4F3A] ${getFieldError("email") ? "border-[#B64A4A]" : "border-[#DDE5DF]"}`}
                />
                {getFieldError("email") && <span className="mt-1 block text-xs text-[#B64A4A]">{getFieldError("email")}</span>}
              </label>
              <label>
                <span className="text-sm font-medium text-[#1F2925]">Phone number <span className="text-[#B64A4A]">*</span></span>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="tel"
                  required
                  className={`mt-1 w-full rounded-[10px] border px-4 py-3 text-sm outline-none focus:border-[#0B4F3A] ${getFieldError("phone") ? "border-[#B64A4A]" : "border-[#DDE5DF]"}`}
                />
                {getFieldError("phone") && <span className="mt-1 block text-xs text-[#B64A4A]">{getFieldError("phone")}</span>}
              </label>
              </div>

              <label className="mt-8 block">
                <span className="text-sm font-medium text-[#1F2925]">Special requests (optional)</span>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 w-full resize-y rounded-[10px] border border-[#DDE5DF] px-4 py-3 text-sm outline-none focus:border-[#0B4F3A]"
                  placeholder="Late arrival, high floor, extra pillow, accessibility requirement..."
                />
                <span className="mt-2 block text-xs text-[#8A958F]">Special requests are not guaranteed and depend on hotel availability.</span>
              </label>

              <p className="mt-6 rounded-[10px] bg-[#F2F5F1] p-3 text-xs leading-5 text-[#66736D]">
                Guest verification: The hotel may request valid identification and additional guest information at check-in as required by the property or applicable regulations.
              </p>
              <button
                type="button"
                onClick={handleContinueToPayment}
                disabled={!hasValidContactDetails}
                className="mt-6 w-full rounded-[10px] bg-[#0B4F3A] px-4 py-3 text-sm font-medium text-white hover:bg-[#083D2D] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to payment
              </button>
            </section>

            <aside className="h-fit space-y-6 lg:sticky lg:top-24">
              <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#1F2925]">Your stay</h2>
                <p className="mt-4 font-medium text-[#1F2925]">{booking?.hotel?.name || "Selected hotel"}</p>
                <p className="mt-1 text-sm text-[#66736D]">{booking.hotel?.location || search.destination || "Destination not selected"}</p>
                <p className="mt-5 text-sm text-[#66736D]">
                  {search.checkIn || "Date not selected"} → {search.checkOut || "Date not selected"}
                </p>
                <p className="mt-2 text-sm text-[#66736D]">
                  {search.adults || "2"} Adults · {search.rooms || "1"} Rooms
                </p>
              </section>

              <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#1F2925]">Your rooms</h2>
                <div className="mt-4 space-y-3 text-sm">
                  {selectedRooms.map(({ room, quantity }) => (
                    <div key={room.id} className="flex justify-between gap-4">
                      <span className="text-[#66736D]">{room.name} × {quantity}</span>
                      <span className="whitespace-nowrap font-medium text-[#1F2925]">₹{room.price.toLocaleString("en-IN")} / night</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#1F2925]">Price breakdown</h2>
                <div className="mt-4 space-y-4 border-b border-[#DDE5DF] pb-4 text-sm">
                  {selectedRooms.map(({ room, quantity }) => (
                    <div key={room.id} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-[#1F2925]">{room.name}</p>
                        <p className="mt-1 text-[#66736D]">
                          ₹{room.price.toLocaleString("en-IN")} × {pricing.nights || 1} night{(pricing.nights || 1) === 1 ? "" : "s"} × {quantity}
                        </p>
                      </div>
                      <span className="whitespace-nowrap font-medium text-[#1F2925]">
                        ₹{(room.price * (pricing.nights || 1) * quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#66736D]">Room subtotal</dt>
                    <dd className="font-medium text-[#1F2925]">₹{pricing.roomSubtotal.toLocaleString("en-IN")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#66736D]">Taxes &amp; fees</dt>
                    <dd className="font-medium text-[#1F2925]">{pricing.taxesAndFees ? `₹${pricing.taxesAndFees.toLocaleString("en-IN")}` : "Calculated at payment"}</dd>
                  </div>
                  <div className="flex justify-between border-t border-[#DDE5DF] pt-3 text-base">
                    <dt className="font-semibold text-[#1F2925]">Estimated total</dt>
                    <dd className="font-semibold text-[#1F2925]">₹{pricing.total.toLocaleString("en-IN")}</dd>
                  </div>
                </dl>
              </section>
              <Link
                to={returnToHotel}
                state={{ selectedRooms, hotel: booking.hotel }}
                className="inline-block text-sm font-medium text-[#0B4F3A]"
              >
                ← Back to hotel
              </Link>
            </aside>
          </div>
        </div>
      </Container>
      <MissingFieldsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        missingFields={missingFields}
      />
    </main>
  );
}

export default Booking;
