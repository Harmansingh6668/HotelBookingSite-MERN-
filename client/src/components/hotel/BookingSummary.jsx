function formatDate(value, fallback) {
  if (!value) return fallback;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
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

function BookingSummary({
  selectedRooms,
  destination,
  checkIn,
  checkOut,
  adults,
  rooms,
  onSearchDataChange,
  onReserve,
}) {
  const today = new Date().toISOString().split("T")[0];
  const nights = getNights(checkIn, checkOut);
  const guestCount = Number(adults) || 0;
  const requestedRoomCount = Number(rooms) || 0;
  const selectedRoomCount = selectedRooms.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const selectedCapacity = selectedRooms.reduce(
    (capacity, item) => capacity + item.room.capacity * item.quantity,
    0
  );
  const total = selectedRooms.reduce(
    (amount, item) => amount + item.room.price * item.quantity * nights,
    0
  );
  const hasEnoughCapacity = selectedCapacity >= guestCount;
  const hasEnoughRooms = selectedRoomCount >= requestedRoomCount;
  const canReserve = hasEnoughRooms && hasEnoughCapacity;
  const minCheckOut = checkIn
    ? (() => {
        const date = new Date(`${checkIn}T00:00:00`);
        date.setDate(date.getDate() + 1);
        return date.toISOString().slice(0, 10);
      })()
    : undefined;
  return (
    <aside className="h-fit rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-xl font-semibold text-[#1F2925]">Your stay</h2>
      <div className="mt-6 space-y-4 text-sm">
        <label className="block">
          <span className="text-[#8A958F]">Destination</span>
          <input
            type="text"
            value={destination || ""}
            onChange={(event) => onSearchDataChange("destination", event.target.value)}
            placeholder="Where are you going?"
            className="mt-1 w-full rounded-[10px] border border-[#DDE5DF] px-3 py-2 font-medium text-[#1F2925] outline-none focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <label className="block">
            <span className="text-[#8A958F]">Check-in</span>
            <input
              type="date"
              value={checkIn || ""}
              min={today}
              onChange={(event) => onSearchDataChange("checkIn", event.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[#DDE5DF] px-3 py-2 font-medium text-[#1F2925] outline-none focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10"
            />
          </label>
          <label className="block">
            <span className="text-[#8A958F]">Check-out</span>
            <input
              type="date"
              value={checkOut || ""}
              min={minCheckOut}
              onChange={(event) => onSearchDataChange("checkOut", event.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[#DDE5DF] px-3 py-2 font-medium text-[#1F2925] outline-none focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10"
            />
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <label className="block">
            <span className="text-[#8A958F]">Adults</span>
            <input
              type="number"
              min="1"
              max="12"
              value={adults}
              onChange={(event) => onSearchDataChange("adults", event.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[#DDE5DF] px-3 py-2 font-medium text-[#1F2925] outline-none focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10"
            />
          </label>
          <label className="block">
            <span className="text-[#8A958F]">Rooms</span>
            <input
              type="number"
              min="1"
              max="10"
              value={rooms}
              onChange={(event) => onSearchDataChange("rooms", event.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[#DDE5DF] px-3 py-2 font-medium text-[#1F2925] outline-none focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10"
            />
          </label>
        </div>
        <p className="text-xs text-[#8A958F]">
          {checkIn && checkOut
            ? `${formatDate(checkIn, "")} to ${formatDate(checkOut, "")} · ${adults} Adults · ${rooms} Room${rooms === "1" ? "" : "s"}`
            : "Update your stay details above"}
        </p>
      </div>
      <div className="mt-6 border-t border-[#DDE5DF] pt-5">
        <p className="text-xs text-[#8A958F]">Selected rooms</p>
        {selectedRooms.length > 0 ? (
          <>
            <div className="mt-2 space-y-2 text-sm">
              {selectedRooms.map(({ room, quantity }) => (
                <div key={room.id} className="flex justify-between gap-3">
                  <span className="text-[#66736D]">{quantity} × {room.name}</span>
                  <span className="font-medium text-[#1F2925]">
                    ₹{(room.price * quantity * nights).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-[#66736D]">
                {selectedCapacity} guest capacity · {selectedRoomCount} room{selectedRoomCount === 1 ? "" : "s"}
              </span>
              <span className="font-semibold text-[#1F2925]">₹{total.toLocaleString("en-IN")}</span>
            </div>
            {!hasEnoughCapacity && (
                <p className="mt-3 text-xs font-medium text-amber-600">
                  Selected rooms fit {selectedCapacity} guest{selectedCapacity === 1 ? "" : "s"}. Please add room(s) to accommodate {guestCount - selectedCapacity} more guest{guestCount - selectedCapacity === 1 ? "" : "s"}.
              </p>
            )}
              {!hasEnoughRooms && (
                <p className="mt-2 text-xs font-medium text-amber-600">
                  Please select at least {requestedRoomCount} room{requestedRoomCount === 1 ? "" : "s"} for this search.
                </p>
              )}
              {hasEnoughCapacity && (
                <p className="mt-3 text-xs font-medium text-emerald-700">
                  ✓ Capacity: {selectedCapacity} / {guestCount} guests covered
              </p>
            )}
          </>
        ) : (
          <p className="mt-1 font-medium text-[#1F2925]">Choose rooms to continue</p>
        )}
      </div>
      <button
        type="button"
        disabled={!canReserve}
        onClick={onReserve}
        className="mt-6 w-full rounded-[10px] bg-[#0B4F3A] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#083D2D] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reserve Now
      </button>
    </aside>
  );
}

export default BookingSummary;