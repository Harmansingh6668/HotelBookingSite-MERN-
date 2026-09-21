
export const ENDPOINTS = {
  hotels: "/api/hotels",

  hotelById: (id) => `/api/hotels/${id}`,

  rooms: "/api/rooms",

  roomById: (id) => `/api/rooms/${id}`,

  searchHotels: "/api/hotels/search",

  bookings: "/api/bookings",

  bookingById: (id) => `/api/bookings/${id}`,

  reviews: "/api/reviews",

  login: "/api/auth/login",

  register: "/api/auth/register",

  payments: "/api/payments",
};