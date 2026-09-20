function SortDropdown({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-[#66736D]">
      <span className="whitespace-nowrap">Sort:</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-[10px] border border-[#DDE5DF] bg-white px-3 py-2 font-medium text-[#1F2925] outline-none focus:border-[#0B4F3A] focus:ring-2 focus:ring-[#0B4F3A]/10"
      >
        <option value="recommended">Recommended</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </label>
  );
}

export default SortDropdown;