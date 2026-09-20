const amenities = ["WiFi", "Parking", "Pool", "Breakfast"];

function SearchSidebar({ filters, onFilterChange, onReset }) {
  return (
    <aside className="rounded-[14px] border border-[#DDE5DF] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1F2925]">
          Filters
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-[#0B4F3A] hover:text-[#083D2D]"
        >
          Clear all
        </button>
      </div>

      <div className="mt-7 border-b border-[#DDE5DF] pb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#1F2925]">Price range</h3>
          <span className="text-sm font-medium text-[#0B4F3A]">
            ₹{filters.maxPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="15000"
          value={filters.maxPrice}
          onChange={(event) =>
            onFilterChange("maxPrice", Number(event.target.value))
          }
          aria-label="Maximum price"
          className="mt-5 w-full accent-[#0B4F3A]"
        />
        <div className="mt-1 flex justify-between text-xs text-[#8A958F]">
          <span>₹1,000</span>
          <span>₹15,000</span>
        </div>
      </div>

      <fieldset className="border-b border-[#DDE5DF] py-6">
        <legend className="text-sm font-semibold text-[#1F2925]">Rating</legend>
        <div className="mt-4 space-y-3 text-sm text-[#66736D]">
          {["5", "4+", "3+"].map((rating) => (
            <label key={rating} className="flex items-center gap-3">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={() => onFilterChange("rating", rating)}
                className="h-4 w-4 accent-[#0B4F3A]"
              />
              <span>{rating} stars</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="pt-6">
        <legend className="text-sm font-semibold text-[#1F2925]">Amenities</legend>
        <div className="mt-4 space-y-3 text-sm text-[#66736D]">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="amenities"
                value={amenity}
                checked={filters.amenities.includes(amenity)}
                onChange={() => onFilterChange("amenity", amenity)}
                className="h-4 w-4 rounded accent-[#0B4F3A]"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}

export default SearchSidebar;