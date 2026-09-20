import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Amenities from "../components/hotel/Amenities";
import BookingSummary from "../components/hotel/BookingSummary";
import HotelGallery from "../components/hotel/HotelGallery";
import HotelInfo from "../components/hotel/HotelInfo";
import RoomCard from "../components/hotel/RoomCard";
import BookingConfirmationModal from "../components/booking/BookingConfirmationModal";
import { getHotelById } from "../services/hotelServices";
import { useBooking } from "../context/BookingContext";

function HotelDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotel, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel= async () => { 
      try{
        setLoading(true);
        setError(null);

        const data = await getHotelById(id);

        setHotelData(data);
      } catch (fetchError) {
        setError(fetchError.message || "Failed to fetch hotel details");
      }finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const { setHotel, setSelectedRooms: saveSelectedRooms } = useBooking();
  const [selectedRooms, setSelectedRooms] = useState(
    () => location.state?.selectedRooms || []
  );
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const destination = searchParams.get("destination");
  const adults = searchParams.get("adults") || "2";
  const rooms = searchParams.get("rooms") || "1";
  const searchQuery = searchParams.toString();
  const searchResultsLink = searchQuery ? `/search?${searchQuery}` : "/search";

  useEffect(() => {
    if(hotel) {
      setHotel(hotel);
    }
  }, [hotel, setHotel]);

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
    const nights =
      !searchParams.get("checkIn") || !searchParams.get("checkOut")
        ? 1
        : Math.max(
            Math.ceil(
              (new Date(`${searchParams.get("checkOut")}T00:00:00`) -
                new Date(`${searchParams.get("checkIn")}T00:00:00`)) /
                (1000 * 60 * 60 * 24)
            ),
            1
          );
    const bookingRooms = selectedRooms.map(({ room, quantity }) => ({
      roomId: room.id,
      roomName: room.name,
      quantity,
      pricePerNight: room.price,
      capacity: room.capacity,
    }));

    navigate(`/booking?${searchQuery}`, {
      state: {
        hotel: {
          id: hotel.id,
          name: hotel.name,
          location: hotel.location,
          paymentMethods: hotel.paymentMethods,
        },
        selectedRooms,
        bookingRooms,
        pricing: {
          roomSubtotal: selectedRooms.reduce(
            (total, item) => total + item.room.price * item.quantity * nights,
            0
          ),
          taxesAndFees: 0,
          total: selectedRooms.reduce(
            (total, item) => total + item.room.price * item.quantity * nights,
            0
          ),
          nights,
        },
      },
    });
  };

  if (loading) {
  return (
    <main className="bg-[#FAF8F2] py-12">
      <Container>
        <p className="text-[#66736D]">Loading hotel...</p>
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
        <Link to={searchResultsLink} className="mb-6 inline-flex text-sm font-medium text-[#0B4F3A] hover:text-[#083D2D]">
          ← Back to search results
        </Link>
        <HotelGallery hotel={hotel} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <HotelInfo hotel={hotel} />
            <Amenities amenities={hotel.amenities} />
            <section className="mt-10 border-t border-[#DDE5DF] pt-8">
              <h2 className="text-xl font-semibold text-[#1F2925]">Available Rooms</h2>
              <div className="mt-5 space-y-4">
                {hotel.rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    quantity={selectedRooms.find((item) => item.room.id === room.id)?.quantity || 0}
                    onQuantityChange={updateRoomQuantity}
                  />
                ))}
              </div>
            </section>
          </div>
          <BookingSummary
            selectedRooms={selectedRooms}
            destination={destination}
            checkIn={searchParams.get("checkIn")}
            checkOut={searchParams.get("checkOut")}
            adults={adults}
            rooms={rooms}
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
          rooms={rooms}
          selectedRooms={selectedRooms}
          onClose={() => setShowBookingConfirmation(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </main>
  );
}

export default HotelDetails;
