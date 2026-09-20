function DestinationSelector({ destinations, activeId, onSelect }) {
  return (
    <nav aria-label="Choose a destination scene" className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {destinations.map((destination) => {
        const isActive = destination.id === activeId;

        return (
          <button
            key={destination.id}
            type="button"
            onClick={() => onSelect(destination.id)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C77A] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
              isActive ? "text-white" : "text-white/55 hover:text-white/80"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isActive ? "bg-[#C8922E]" : "bg-white/45"
              }`}
              aria-hidden="true"
            />
            {destination.name}
          </button>
        );
      })}
    </nav>
  );
}

export default DestinationSelector;
