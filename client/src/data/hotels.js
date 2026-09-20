const hotels = [
  {
    id: "1",
    name: "The Grand Amritsar",
    location: "Amritsar, Punjab",
    rating: 4.8,
    reviews: 245,
    paymentMethods: ["upi", "card", "netBanking"],
    price: 4299,
    description:
      "A beautiful property located close to Amritsar's iconic landmarks, combining warm hospitality with comfortable modern rooms.",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Parking",
      "Breakfast",
      "Air Conditioning",
      "Restaurant",
    ],
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
    ],
    rooms: [
      {
        id: "deluxe-king",
        name: "Deluxe King Room",
        capacity: 2,
        details: "2 guests · 1 king bed",
        features: ["Breakfast", "Free cancellation"],
        price: 4299,
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "premium-suite",
        name: "Premium Garden Suite",
        capacity: 3,
        details: "3 guests · 1 king bed",
        features: ["Breakfast", "Free cancellation"],
        price: 5799,
        image:
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=700&q=80",
      },
      {
        id: "family-room",
        name: "Family Comfort Room",
        capacity: 4,
        details: "4 guests · 2 double beds",
        features: ["Breakfast", "Free cancellation"],
        price: 6499,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=700&q=80",
      },
    ],
  },
];

export function getHotelById(id) {
  return hotels.find((hotel) => hotel.id === id) || hotels[0];
}

export default hotels;
