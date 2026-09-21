import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchSidebar from "../components/search/SearchSidebar";
import SearchSummary from "../components/search/SearchSummary";
import SortDropdown from "../components/search/SortDropdown";
import LoadingState from "../components/ui/LoadingState";
import SearchBox from "../components/search/SearchBox";
import { useBooking } from "../context/BookingContext";
import { getHotels, searchHotels } from "../services/api/hotels";
// const hotels = [
//   {
//     id: "1",
//     name: "The Grand Amritsar",
//     location: "Amritsar, Punjab",
//     rating: 4.8,
//     price: 4299,
//     amenities: ["WiFi", "Pool", "Breakfast"],
//     image:
//       "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
//   },
//   {
//     id: "2",
//     name: "Golden Temple View",
//     location: "Amritsar, Punjab",
//     rating: 4.6,
//     price: 2899,
//     amenities: ["WiFi", "Parking", "Breakfast"],
//     image:
//       "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
//   },
//   {
//     id: "3",
//     name: "Ramada by Wyndham Amritsar",
//     location: "Amritsar, Punjab",
//     rating: 4.7,
//     price: 5199,
//     amenities: ["WiFi", "Pool", "Parking"],
//     image:
//       "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
//   },
//   {
//     id: "4",
//     name: "Amritsar Heritage House",
//     location: "Amritsar, Punjab",
//     rating: 4.4,
//     price: 2199,
//     amenities: ["WiFi", "Breakfast"],
//     image:
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
//   },
// ];


const initialFilters = {
  maxPrice: 15000,
  rating: "",
  amenities: [],
};

function SearchHotelCard({ hotel, searchQuery }) {
  const hotelLink = `/hotel/${hotel._id}${searchQuery ? `?${searchQuery}` : ""}`;
  const hotelImage = hotel.image?.[0] || hotel.image;

  return (
    <article className="grid gap-5 rounded-[14px] border border-[#DDE5DF] bg-white p-4 transition-shadow hover:shadow-md sm:grid-cols-[190px_1fr]">
      <div className="h-44 overflow-hidden rounded-[10px] sm:h-full">
        <Link to={hotelLink}>
          <img
            src={hotelImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"}
            alt={hotel.name}
            className="h-full w-full object-cover"
          />
        </Link>

      </div>

      <div className="flex min-w-0 flex-col justify-between py-1">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <Link to={hotelLink}>
              <h3 className="text-lg font-semibold text-[#1F2925]">{hotel.name}</h3>
            </Link>
            <span className="rounded-md bg-[#FFF6DD] px-2 py-1 text-sm font-semibold text-[#A97825]">
              ★ {hotel.rating}
            </span>
          </div>
          <p className="mt-2 text-sm text-[#66736D]">📍 {hotel.address}, {hotel.city}</p>
          <p className="mt-4 text-sm text-[#66736D]">
            {hotel.amenities?.join(" · ")}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          {/* <p className="text-xl font-semibold text-[#1F2925]">
            ₹{hotel.price.toLocaleString("en-IN")}
            <span className="text-sm font-normal text-[#66736D]"> / night</span>
          </p> */}
          <Link
            to={hotelLink}
            className="rounded-[10px] bg-[#0B4F3A] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#083D2D]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

function SearchResults() {
  const [searchParams] = useSearchParams();
  const { setSearch } = useBooking();
  const searchQuery = searchParams.toString();
  const [sort, setSort] = useState("recommended");
  const [filters, setFilters] = useState(initialFilters);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const adults = searchParams.get("adults") || searchParams.get("guests") || "2";
  const rooms = searchParams.get("rooms") || "1";

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError("");
        const request = {
          destination: destination || "",
          checkIn: checkIn || "",
          checkOut: checkOut || "",
          adults,
          rooms,
        };
        const data =
          checkIn && checkOut
            ? await searchHotels(request)
            : await getHotels();
        setHotels(data.hotels || []);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load hotels.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [adults, checkIn, checkOut, destination, rooms]);

  useEffect(() => {
    setSearch({
      destination: destination || "",
      checkIn: checkIn || "",
      checkOut: checkOut || "",
      adults: Number(adults) || 0,
      rooms: Number(rooms) || 0,
    });
  }, [destination, checkIn, checkOut, adults, rooms, setSearch]);

  const filteredHotels = useMemo(
    () =>
      hotels.filter((hotel) => {
        const destinationQuery = destination?.trim().toLowerCase() || "";
        const matchesDestination =
          !destinationQuery ||
          hotel.name?.toLowerCase().includes(destinationQuery) ||
          hotel.city?.toLowerCase().includes(destinationQuery) ||
          hotel.address?.toLowerCase().includes(destinationQuery);
        //const matchesPrice = hotel.price <= filters.maxPrice;
        const matchesRating =
          !filters.rating || hotel.rating >= Number(filters.rating.replace("+", ""));
        const matchesAmenities = filters.amenities.every((amenity) =>
          hotel.amenities?.includes(amenity)
        );

        return matchesDestination && matchesRating && matchesAmenities;
      }),
    [destination, filters, hotels]
  );

  const sortedHotels = useMemo(() => {
    const result = [...filteredHotels];
    //if (sort === "price-low") return result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") return result.sort((a, b) => b.price - a.price);
    if (sort === "rating") return result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [filteredHotels, sort]);

  const handleFilterChange = (name, value) => {
    setFilters((current) => {
      if (name === "amenity") {
        const amenities = current.amenities.includes(value)
          ? current.amenities.filter((amenity) => amenity !== value)
          : [...current.amenities, value];

        return { ...current, amenities };
      }

      return { ...current, [name]: value };
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
      <div className="border-b border-[#DDE5DF] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SearchBox />
        </div>
      </div>
      <SearchSummary
        destination={destination}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        rooms={rooms}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <SearchSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={() => setFilters(initialFilters)}
          />

          <main>
            {loading && <LoadingState message="Searching hotels..." />}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-[#1F2925]">
                {sortedHotels.length} hotels found
              </h2>
              <SortDropdown value={sort} onChange={setSort} />
            </div>}

            {!loading && !error && <div className="space-y-5">
              {sortedHotels.length > 0 ? (
                sortedHotels.map((hotel) => (
                  <SearchHotelCard
                    key={hotel._id}
                    hotel={hotel}
                    searchQuery={searchQuery}
                  />
                ))
              ) : (
                <div className="rounded-[14px] border border-dashed border-[#DDE5DF] bg-white p-10 text-center">
                  <h3 className="font-semibold text-[#1F2925]">
                    No hotels match these filters
                  </h3>
                  <p className="mt-2 text-sm text-[#66736D]">
                    Try clearing a filter to see more stays.
                  </p>
                </div>
              )}
            </div>
            }
          </main>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;