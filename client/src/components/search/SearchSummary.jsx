function formatDate(value) {
  if (!value) {
    return "Any date";
  }

  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function SearchSummary({ destination, checkIn, checkOut, adults, rooms }) {
  return (
    <section className="border-b border-[#DDE5DF] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[14px] border border-[#DDE5DF] bg-[#FAF8F2] px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#66736D]">
            Search
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#66736D]">
            <h1 className="text-xl font-semibold text-[#1F2925]">
              {destination || "All destinations"}
            </h1>
            <span aria-hidden="true">•</span>
            <span>
              {formatDate(checkIn)} → {formatDate(checkOut)}
            </span>
            <span aria-hidden="true">•</span>
            <span>{adults} Adults</span>
            <span aria-hidden="true">•</span>
            <span>{rooms} Room{rooms === 1 ? "" : "s"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchSummary;