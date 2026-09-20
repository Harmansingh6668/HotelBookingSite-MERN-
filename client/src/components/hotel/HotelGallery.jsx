function HotelGallery({ hotel }) {
  return (
    <div className="grid h-[360px] gap-3 sm:h-[480px] lg:grid-cols-[1.7fr_1fr]">
      <img
        src={hotel.images[0]}
        alt={`${hotel.name} main view`}
        className="h-full min-h-0 w-full rounded-[16px] object-cover"
      />
      <div className="grid min-h-0 grid-rows-2 gap-3">
        {hotel.images.slice(1).map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${hotel.name} view ${index + 2}`}
            className="h-full min-h-0 w-full rounded-[16px] object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default HotelGallery;
