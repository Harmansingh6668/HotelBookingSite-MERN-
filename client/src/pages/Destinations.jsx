import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import LoadingState from "../components/ui/LoadingState";
import HotelCard from "../components/home/HotelCard";
import SearchBox from "../components/search/SearchBox";
import { getHotels } from "../services/api/hotels";

const destinationImages = {
  amritsar:
    "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=900&q=80",
  chandigarh:
    "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80",
  delhi:
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80",
  goa:
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  jaipur:
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
  mumbai:
    "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=900&q=80",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";

function Destinations() {
  const [hotels, setHotels] = useState([]);
  const [searchParams] = useSearchParams();
  const selectedCity = searchParams.get("city") || "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        setHotels(data.hotels || []);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const destinations = useMemo(() => {
    const grouped = new Map();

    hotels.forEach((hotel) => {
      const city = hotel.city?.trim();
      if (!city) return;

      const key = city.toLowerCase();
      const current = grouped.get(key) || { name: city, count: 0 };
      grouped.set(key, { ...current, count: current.count + 1 });
    });

    return [...grouped.values()].sort((a, b) => b.count - a.count);
  }, [hotels]);

  const selectedHotels = useMemo(
    () =>
      hotels.filter(
        (hotel) =>
          selectedCity &&
          hotel.city?.trim().toLowerCase() === selectedCity.toLowerCase()
      ),
    [hotels, selectedCity]
  );

  return (
    <main className="min-h-screen bg-[#FAF8F2] py-12 sm:py-16">
      <Container>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#C8922E]">
          Explore
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-[#1F2925] sm:text-4xl">
          Popular destinations
        </h1>
        <p className="mt-3 max-w-2xl text-[#66736D]">
          Discover stays in the cities where our hotels are available.
        </p>

        <SearchBox />

        {loading && (
          <LoadingState
            className="mt-10"
            message="Loading destinations..."
          />
        )}
        {error && <p className="mt-10 text-red-600">{error}</p>}

        {!loading && !error && destinations.length === 0 && (
          <p className="mt-10 text-[#66736D]">No destinations are available yet.</p>
        )}

        {!loading && !error && destinations.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => {
              const image =
                destinationImages[destination.name.toLowerCase()] || fallbackImage;

              return (
                <Link
                  key={destination.name}
                  to={`/destinations?city=${encodeURIComponent(destination.name)}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-[18px]"
                >
                  <img
                    src={image}
                    alt={destination.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <h2 className="text-2xl font-semibold">{destination.name}</h2>
                    <p className="mt-1 text-sm text-white/85">
                      {destination.count}{" "}
                      {destination.count === 1 ? "hotel" : "hotels"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {selectedCity && !loading && !error && (
          <section className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#C8922E]">
                  Stays in {selectedCity}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#1F2925]">
                  Hotels in {selectedCity}
                </h2>
              </div>
              <Link
                to={`/search?destination=${encodeURIComponent(selectedCity)}`}
                className="text-sm font-semibold text-[#0B4F3A]"
              >
                View all results →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {selectedHotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}

export default Destinations;
