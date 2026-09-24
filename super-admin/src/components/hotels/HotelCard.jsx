import {
  ArrowRight,
  Building2,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const hotelId = hotel?._id || hotel?.id;

  const name = hotel?.name || "Unnamed Hotel";

  const location =
    hotel?.city ||
    hotel?.location ||
    hotel?.address?.city ||
    "Location unavailable";

  const status = hotel?.status || "ACTIVE";

  const image =
    hotel?.image ||
    hotel?.imageUrl ||
    hotel?.images?.[0];

  const isActive = status === "ACTIVE";

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">

        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Building2
              size={42}
              className="text-slate-300"
            />
          </div>
        )}

        {/* Status */}
        <div className="absolute right-3 top-3">
          <span
            className={`
              rounded-full px-2.5 py-1 text-[10px] font-bold
              shadow-sm backdrop-blur
              ${
                isActive
                  ? "bg-emerald-100/95 text-emerald-800"
                  : "bg-slate-100/95 text-slate-600"
              }
            `}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="truncate text-base font-semibold text-slate-900">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={14} />

          <span className="truncate">
            {location}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

          <div>
            <p className="text-[10px] uppercase tracking-wide text-slate-400">
              Hotel ID
            </p>

            <p className="mt-1 max-w-28 truncate text-xs font-medium text-slate-600">
              {hotelId || "N/A"}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              hotelId &&
              navigate(`/hotels/${hotelId}`)
            }
            disabled={!hotelId}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            View
            <ArrowRight size={14} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default HotelCard;