function FinalBookingSummary({ booking }) {
  const selectedRooms = booking?.selectedRooms || [];
  const pricing = booking?.pricing || { roomSubtotal: 0, taxesAndFees: 0, total: 0 };
  const stay = booking?.stay || {};
  console.log(selectedRooms)
  return (
    <aside className="h-fit space-y-6 lg:sticky lg:top-24">
      <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1F2925]">Your stay</h2>
        <p className="mt-4 font-medium text-[#1F2925]">{booking?.hotel?.name || "Selected hotel"}</p>
        <p className="mt-1 text-sm text-[#66736D]">{booking?.hotel?.location || stay.destination || "Destination not selected"}</p>
        <p className="mt-5 text-sm text-[#66736D]">
          {stay.checkIn || "Date not selected"} → {stay.checkOut || "Date not selected"}
        </p>
        <p className="mt-2 text-sm text-[#66736D]">
          {stay.adults || "2"} Adults · {stay.rooms || "1"} Rooms
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
    </aside>
  );
}

export default FinalBookingSummary;