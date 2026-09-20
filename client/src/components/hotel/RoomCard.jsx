function RoomCard({ room, quantity, onQuantityChange }) {
  const isSelected = quantity > 0;

  return (
    <article
      className={`grid gap-4 rounded-[14px] border bg-white p-4 transition-shadow sm:grid-cols-[150px_1fr] ${
        isSelected
          ? "border-[#0B4F3A] ring-2 ring-[#0B4F3A]/10"
          : "border-[#DDE5DF]"
      }`}
    >
      <img
        src={room.image}
        alt={room.name}
        className="h-32 w-full rounded-[10px] object-cover sm:h-full"
      />
      <div className="flex min-w-0 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-[#1F2925]">{room.name}</h3>
          <p className="mt-2 text-sm text-[#66736D]">{room.details}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#66736D]">
            {room.features.map((feature) => (
              <span key={feature}>
                <span className="mr-1 text-[#2F7D5A]">✓</span>{feature}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <p className="text-lg font-semibold text-[#1F2925]">
            ₹{room.price.toLocaleString("en-IN")}
            <span className="text-sm font-normal text-[#66736D]"> / night</span>
          </p>
          {isSelected ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onQuantityChange(room, quantity - 1)}
                aria-label={`Remove one ${room.name}`}
                className="h-10 w-10 rounded-[10px] border border-[#DDE5DF] text-lg text-[#1F2925]"
              >
                −
              </button>
              <span className="min-w-8 text-center text-sm font-semibold text-[#1F2925]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onQuantityChange(room, quantity + 1)}
                aria-label={`Add one ${room.name}`}
                className="h-10 w-10 rounded-[10px] bg-[#0B4F3A] text-lg text-white hover:bg-[#083D2D]"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onQuantityChange(room, 1)}
              className="rounded-[10px] bg-[#0B4F3A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#083D2D]"
            >
              Select Room
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default RoomCard;