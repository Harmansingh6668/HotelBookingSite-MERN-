function HotelInfo({ hotel }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[#1F2925] sm:text-4xl">
            {hotel.name}
          </h1>
          <p className="mt-3 text-sm text-[#66736D]">📍 {hotel.location}</p>
        </div>
        <div className="rounded-[10px] bg-[#FFF6DD] px-3 py-2 text-right">
          <p className="font-semibold text-[#A97825]">★ {hotel.rating}</p>
          <p className="mt-1 text-xs text-[#66736D]">
            Excellent · {hotel.reviews} reviews
          </p>
        </div>
      </div>
      <p className="mt-6 max-w-3xl leading-7 text-[#66736D]">
        {hotel.description}
      </p>
    </div>
  );
}

export default HotelInfo;