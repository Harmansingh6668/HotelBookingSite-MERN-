import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import HotelCard from "./HotelCard";

const hotels = [
  {
    id: "1",
    name: "The Grand Amritsar",
    location: "Amritsar, Punjab",
    rating: 4.8,
    price: 4299,
    amenities: ["WiFi", "Pool", "Breakfast"],
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    name: "The Oberoi Chandigarh",
    location: "Chandigarh, Punjab",
    rating: 4.7,
    price: 5199,
    amenities: ["WiFi", "Parking", "Breakfast"],
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "3",
    name: "The Delhi House",
    location: "New Delhi, Delhi",
    rating: 4.6,
    price: 3899,
    amenities: ["WiFi", "Parking"],
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "4",
    name: "Coastal Palm Resort",
    location: "North Goa, Goa",
    rating: 4.9,
    price: 6499,
    amenities: ["WiFi", "Pool", "Breakfast"],
    image: "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=900&q=80",
  },
];

function FeaturedHotels() {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-20">
      <Container>

        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold text-[#1F2925] sm:text-4xl">
              Featured Hotels
            </h2>

            <p className="mt-3 text-[#66736D]">
              Handpicked stays for a memorable journey.
            </p>
          </div>

          <button className="hidden text-sm font-semibold text-[#0B4F3A] hover:text-[#083D2D] sm:block" onClick={() => navigate('/hotels')}>
            View all hotels →
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}

export default FeaturedHotels;