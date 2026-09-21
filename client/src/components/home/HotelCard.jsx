import { Link } from "react-router-dom";
import Badge from "../ui/Badge";

function HotelCard({ hotel }) {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=900&q=80",
  ];
  const imageIndex = [...(hotel.name || "hotel")].reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  ) % fallbackImages.length;
  const hotelImage = Array.isArray(hotel.image)
    ? hotel.image[0]
    : hotel.image || fallbackImages[imageIndex];
    
  return (
    <Link
      to={`/hotel/${hotel._id || hotel.id}`}
      className="group block overflow-hidden rounded-[18px] border border-[#DDE5DF] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >

      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={hotelImage}
          alt={hotel.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4">
          <Badge>Featured</Badge>
        </div>
      </div>

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-[#1F2925]">
            {hotel.name}
          </h3>

          <span className="shrink-0 text-sm font-medium text-[#C8922E]">
            ★ {hotel.rating}
          </span>
        </div>

        <p className="mt-2 text-sm text-[#66736D]">
          {hotel.address} , {hotel.city}
        </p>

        <p className="mt-3 text-xs text-[#66736D]">
          {hotel.amenities?.join(" · ")}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <span className="text-xs text-[#66736D]">
              From
            </span>

            {/* <p className="text-lg font-semibold text-[#1F2925]">
              ₹{hotel.price.toLocaleString("en-IN")}
              <span className="text-sm font-normal text-[#66736D]">
                {" "} / night
              </span>
            </p> */}
          </div>

          <span
            className="rounded-[10px] bg-[#0B4F3A] px-4 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-[#083D2D]"
          >
            View
          </span>
        </div>

      </div>
    </Link>
  );
}

export default HotelCard;