import { useState } from "react";

function formatDate(value) {
  if (!value) return "Not selected";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;
  const nights = Math.ceil(
    (new Date(`${checkOut}T00:00:00`) - new Date(`${checkIn}T00:00:00`)) /
      (1000 * 60 * 60 * 24)
  );
  return Math.max(nights, 1);
}

function BookingConfirmationModal({
  hotel,
  checkIn,
  checkOut,
  adults,
  rooms,
  selectedRooms,
  onClose,
  onConfirm,
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const nights = getNights(checkIn, checkOut);
  const total = selectedRooms.reduce(
    (amount, item) => amount + item.room.price * item.quantity * nights,
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#1F2925]/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-confirmation-title"
    >
      <div className="my-8 w-full max-w-2xl rounded-[16px] bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="booking-confirmation-title" className="text-2xl font-semibold text-[#1F2925]">
              Confirm your stay
            </h2>
            <p className="mt-2 text-sm text-[#66736D]">
              Please review your booking details before continuing.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking confirmation"
            className="text-2xl leading-none text-[#66736D] hover:text-[#1F2925]"
          >
            ×
          </button>
        </div>

        <div className="mt-6 border-t border-[#DDE5DF] pt-6">
          <h3 className="font-semibold text-[#1F2925]">{hotel.name}</h3>
          <p className="mt-1 text-sm text-[#66736D]">📍 {hotel.address}, {hotel.city}</p>

          <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[#8A958F]">Check-in</dt>
              <dd className="mt-1 font-medium text-[#1F2925]">{formatDate(checkIn)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[#8A958F]">Check-out</dt>
              <dd className="mt-1 font-medium text-[#1F2925]">{formatDate(checkOut)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[#8A958F]">Guests</dt>
              <dd className="mt-1 font-medium text-[#1F2925]">{adults} Adults</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-[#8A958F]">Rooms</dt>
              <dd className="mt-1 font-medium text-[#1F2925]">{rooms} requested</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-[#DDE5DF] pt-5">
            <h3 className="text-xs uppercase tracking-[0.12em] text-[#8A958F]">Selected rooms</h3>
            <div className="mt-3 space-y-3">
              {selectedRooms.map(({ room, quantity }) => (
                <div key={room.id} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className="font-medium text-[#1F2925]">{room.name} × {quantity}</p>
                    <p className="mt-1 text-[#66736D]">
                      ₹{room.price.toLocaleString("en-IN")}/night
                    </p>
                  </div>
                  <span className="font-medium text-[#1F2925]">
                    ₹{(room.price * quantity * nights).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#DDE5DF] pt-5">
            <span className="font-medium text-[#66736D]">Estimated stay total</span>
            <span className="text-xl font-semibold text-[#1F2925]">₹{total.toLocaleString("en-IN")}</span>
          </div>

          <p className="mt-5 rounded-[10px] bg-[#F2F5F1] p-3 text-xs leading-5 text-[#66736D]">
            Guest verification: The hotel may request valid identification and additional guest information at check-in as required by the property or applicable regulations.
          </p>

          <label className="mt-5 flex items-start gap-3 text-sm text-[#1F2925]">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(event) => setIsConfirmed(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#0B4F3A]"
            />
            <span>I confirm that my booking details are correct.</span>
          </label>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[10px] border border-[#DDE5DF] px-5 py-3 text-sm font-medium text-[#1F2925] hover:bg-[#F2F5F1]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={!isConfirmed}
              className="rounded-[10px] bg-[#0B4F3A] px-5 py-3 text-sm font-medium text-white hover:bg-[#083D2D] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirm &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmationModal;
