function DestinationBackground({ destinations, activeId }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {destinations.map((destination) => {
        const isActive = destination.id === activeId;

        return (
          <img
            key={destination.id}
            src={destination.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-opacity motion-safe:duration-700 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition: destination.position }}
          />
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
    </div>
  );
}

export default DestinationBackground;
