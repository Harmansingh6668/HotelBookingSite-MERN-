import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <Link
      to={`/search?destination=${encodeURIComponent(destination.name)}`}
      className="group relative block aspect-[16/8] overflow-hidden rounded-[18px]"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />

      <h3 className="absolute bottom-6 left-6 text-2xl font-semibold text-white">
        {destination.name}
      </h3>
    </Link>
  );
}

export default DestinationCard;