function HotelInfo({ hotel }) {
  return (
    <div>
      <div className="flex justify-end">
        <div className="rounded-[10px] bg-[#FFF6DD] px-3 py-2 text-right">
          <p className="font-semibold text-[#A97825]">★ {hotel.rating}</p>
          <p className="mt-1 text-xs text-[#66736D]">
            Excellent · {hotel.reviewsCount} reviews
          </p>
        </div>
      </div>
      <p className="mt-4 max-w-3xl leading-7 text-[#66736D]">
        {hotel.description}
      </p>
    </div>
  );
}

export default HotelInfo;