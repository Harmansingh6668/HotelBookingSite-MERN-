function formatDate(value) {
  if (!value) return "Not selected";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${value}T00:00:00`));
}

function ConfirmationCard({ booking, bookingId }) {
  const stay = booking?.stay || {};
  const pricing = booking?.pricing || { total: 0 };
  const selectedRooms = booking?.selectedRooms || [];

  return (
    <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F3EC] text-2xl font-semibold text-[#2F7D5A]">
          ✓
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-[#1F2925]">Booking Confirmed</h1>
        <p className="mt-2 text-sm text-[#66736D]">Your reservation is confirmed.</p>
        <p className="mt-4 text-sm font-semibold text-[#0B4F3A]">Booking #{bookingId}</p>
      </div>

      <div className="mt-8 rounded-[12px] border border-[#DDE5DF] p-5">
        <h2 className="font-semibold text-[#1F2925]">{booking?.hotel?.name || "Selected hotel"}</h2>
        <p className="mt-1 text-sm text-[#66736D]">{booking?.hotel?.location || stay.destination}</p>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[#8A958F]">Check-in</dt>
            <dd className="mt-1 font-medium text-[#1F2925]">{formatDate(stay.checkIn)}</dd>
          </div>
          <div>
            <dt className="text-[#8A958F]">Check-out</dt>
            <dd className="mt-1 font-medium text-[#1F2925]">{formatDate(stay.checkOut)}</dd>
          </div>
        </dl>
        <p className="mt-5 text-sm text-[#66736D]">
          {stay.adults || "2"} Adults · {stay.rooms || "1"} Rooms
        </p>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-[#1F2925]">Your rooms</h2>
        <div className="mt-4 space-y-3 text-sm">
          {selectedRooms.map(({ room, quantity }) => (
            <div key={room.id} className="flex justify-between gap-4">
              <span className="text-[#66736D]">{room.name} × {quantity}</span>
              <span className="font-medium text-[#1F2925]">₹{room.price.toLocaleString("en-IN")} / night</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#DDE5DF] pt-5">
        <span className="font-medium text-[#66736D]">Total paid</span>
        <span className="text-lg font-semibold text-[#1F2925]">₹{pricing.total.toLocaleString("en-IN")}</span>
      </div>

      <p className="mt-6 text-center text-sm text-[#66736D]">
        Confirmation sent to <span className="font-medium text-[#1F2925]">{booking?.booker?.email || "your email address"}</span>
      </p>
    </section>
  );
}

export default ConfirmationCard;