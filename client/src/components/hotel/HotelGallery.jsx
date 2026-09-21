function HotelGallery({ hotel }) {
    const hotelImage =
  hotel.image?.length > 0
    ? hotel.image[0]
    : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";
    
  return (
    <div className="grid h-[360px] gap-3 sm:h-[480px] lg:grid-cols-[1.7fr_1fr]">
      <img
        src={hotelImage}
        alt={`${hotel.name} main view`}
        className="h-full min-h-0 w-full rounded-[16px] object-cover"
      />
      {/* <div className="grid min-h-0 grid-rows-2 gap-3">
        {hotel.image.slice(1).map((item, index) => (
          <img
            key={item}
            src={item}
            alt={`${hotel.name} view ${index + 2}`}
            className="h-full min-h-0 w-full rounded-[16px] object-cover"
          />
        ))}
      </div> */}
    </div>
  );
}

export default HotelGallery;
