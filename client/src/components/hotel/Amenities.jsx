function Amenities({ amenities }) {
  const amenityList = Array.isArray(amenities) ? amenities : [];

  return (
    <section className="mt-10 border-t border-[#DDE5DF] pt-8">
      <h2 className="text-xl font-semibold text-[#1F2925]">Amenities</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {amenityList.map((amenity) => (
          <span key={amenity} className="text-sm text-[#66736D]">
            <span className="mr-2 font-semibold text-[#2F7D5A]">✓</span>{amenity}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Amenities;
