import { useEffect, useState } from "react";
import HotelCard from "../components/home/HotelCard";
import SearchBox from "../components/search/SearchBox";
import LoadingState from "../components/ui/LoadingState";
import { getHotelCount, getHotels } from "../services/api/hotels";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const [hotelData, countData] = await Promise.all([
          getHotels(),
          getHotelCount(),
        ]);

        setHotels(hotelData.hotels || []);
        setTotalHotels(countData.count || 0);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load hotels.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);
  console.log("Hotels in Hotels.jsx:", hotels);
  return (
    <main className="min-h-screen bg-[#FAF8F2]">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#C8922E]">
            Explore
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#1F2925]">
            Our hotels
          </h1>
          {!loading && !error && (
            <p className="mt-2 text-[#66736D]">
              {totalHotels} {totalHotels === 1 ? "hotel" : "hotels"} available
            </p>
          )}
        </div>

        <SearchBox />

        {loading && <LoadingState message="Loading hotels..." />}

        {!loading && error && <p className="text-red-600">{error}</p>}

        {!loading && !error && hotels.length === 0 && (
          <p className="text-[#66736D]">No hotels are available right now.</p>
        )}

        {!loading && !error && hotels.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Hotels;
