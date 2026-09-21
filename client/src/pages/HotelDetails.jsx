import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import LoadingState from "../components/ui/LoadingState";
import Amenities from "../components/hotel/Amenities";
import BookingSummary from "../components/hotel/BookingSummary";
import HotelGallery from "../components/hotel/HotelGallery";
import HotelInfo from "../components/hotel/HotelInfo";
import RoomCard from "../components/hotel/RoomCard";
import BookingConfirmationModal from "../components/booking/BookingConfirmationModal";
import { getHotelById } from "../services/api/hotels";
import { useBooking } from "../context/BookingContext";
import { getRoomsByHotel } from "../services/api/rooms";
import { isAuthenticated } from "../services/auth/authService";

function HotelDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotel, setHotelData] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchHotelData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [hotelData, roomsData] = await Promise.all([
        getHotelById(id),
        getRoomsByHotel(id),
      ]);

      setHotelData(hotelData.hotel);
      setRooms(roomsData.rooms);
    } catch (error) {
      console.error("Failed to load hotel:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchHotelData();
}, [id]);
  console.log("Hotel data in HotelDetails.jsx:", hotel);
  console.log("Hotel data in HotelDetails.jsx:", rooms);
  
  const {  setSelectedRooms: saveSelectedRooms } = useBooking();
  const [selectedRooms, setSelectedRooms] = useState(
    () => location.state?.selectedRooms || []
  );
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const adults = searchParams.get("adults") || "2";
  // const rooms = searchParams.get("rooms") || "1";
  const requestedRooms = searchParams.get("rooms") || "1";
  const searchQuery = searchParams.toString();
  const searchResultsLink = searchQuery ? `/search?${searchQuery}` : "/search";

  // useEffect(() => {
  //   if(hotel) {
  //     setHotel(hotel);
  //   }
  // }, [hotel, setHotel]);

  useEffect(() => {
    saveSelectedRooms(
      selectedRooms.map(({ room, quantity }) => ({
        roomId: room.id,
        quantity,
      }))
    );
  }, [selectedRooms, saveSelectedRooms]);

  const updateSearchData = (name, value) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value) {
        nextParams.set(name, value);
      } else {
        nextParams.delete(name);
      }

      if (
        name === "checkIn" &&
        value &&
        nextParams.get("checkOut") &&
        nextParams.get("checkOut") <= value
      ) {
        nextParams.delete("checkOut");
      }

      return nextParams;
    });
  };

  const updateRoomQuantity = (room, quantity) => {
    setSelectedRooms((currentRooms) => {
      const nextRooms = currentRooms.filter((item) => item.room.id !== room.id);
      return quantity > 0
        ? [...nextRooms, { room, quantity }]
        : nextRooms;
    });
  };

  const handleConfirmBooking = () => {
    if (!isAuthenticated()) {
      navigate("/login", {
        state: {
          from: location,
        },
      });

      return;
    }

    if (selectedRooms.length === 0) return;

    setShowBookingConfirmation(false);
    navigate(`/booking?${searchQuery}`, {
      state: {
        hotel: {
          id: hotel._id,
          name: hotel.name,
          location: `${hotel.address}, ${hotel.city}`,
          paymentMethods: hotel.paymentMethods || [],
        },
        selectedRooms,
        stay: {
          destination: `${hotel.address}, ${hotel.city}`,
          checkIn: searchParams.get("checkIn") || "",
          checkOut: searchParams.get("checkOut") || "",
          adults,
          rooms: requestedRooms,
        },
      },
    });
  };

  if (loading) {
  return (
    <main className="bg-[#FAF8F2] py-12">
      <Container>
        <LoadingState message="Loading hotel..." />
      </Container>
    </main>
  );
}

if (error || !hotel) {
  return (
    <main className="bg-[#FAF8F2] py-12">
      <Container>
        <p className="text-red-600">
          {error || "Hotel not found."}
        </p>
      </Container>
    </main>
  );
}

  return (
    <main className="bg-[#FAF8F2] py-8 sm:py-12">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#66736D]">
            <li>
              <Link to="/" className="hover:text-[#0B4F3A]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/hotels" className="hover:text-[#0B4F3A]">
                Hotels
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to={`/destinations?city=${encodeURIComponent(hotel.city || "")}`}
                className="hover:text-[#0B4F3A]"
              >
                {hotel.city || "Destination"}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[#1F2925]">
              {hotel.name}
            </li>
          </ol>
        </nav>

        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C8922E]">
              Hotel stay
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#1F2925] sm:text-5xl">
              {hotel.name}
            </h1>
            <p className="mt-3 text-sm text-[#66736D]">
              {hotel.address}, {hotel.city}
            </p>
          </div>
          <Link
            to={searchResultsLink}
            className="text-sm font-medium text-[#0B4F3A] hover:text-[#083D2D]"
          >
            ← Back to search results
          </Link>
        </header>

        <HotelGallery hotel={hotel} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <HotelInfo hotel={hotel} />
            <Amenities amenities={hotel.amenities} />
            <section className="mt-10 border-t border-[#DDE5DF] pt-8">
              <h2 className="text-xl font-semibold text-[#1F2925]">Available Rooms</h2>
              <div className="mt-5 space-y-4">
                {rooms.map((room) => (
                  <RoomCard
                    key={room._id}
                    room={{
                      ...room,
                      id: room._id,
                      name: room.roomType,
                      details: `${room.description} · ${room.capacity} guest${
                        room.capacity > 1 ? "s" : ""
                      } · ${room.bedType} bed`,
                      features: room.amenities,
                      image:
                        room.images?.length > 0
                          ? room.images[0]
                          : "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80",
                      price: room.pricePerNight,
                    }}
                    quantity={selectedRooms.find((item) => item.room.id === room._id)?.quantity || 0}
                    onQuantityChange={updateRoomQuantity}
                  />
                ))}
              </div>
            </section>
          </div>
          <BookingSummary
            selectedRooms={selectedRooms}
            destination={hotel.address + ", " + hotel.city}
            checkIn={searchParams.get("checkIn")}
            checkOut={searchParams.get("checkOut")}
            adults={adults}
            rooms={requestedRooms}
            onSearchDataChange={updateSearchData}
            onReserve={() => setShowBookingConfirmation(true)}
          />
        </div>
      </Container>
      {showBookingConfirmation && (
        <BookingConfirmationModal
          hotel={hotel}
          checkIn={searchParams.get("checkIn")}
          checkOut={searchParams.get("checkOut")}
          adults={adults}
          rooms={requestedRooms}
          selectedRooms={selectedRooms}
          onClose={() => setShowBookingConfirmation(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </main>
  );
}

export default HotelDetails;
