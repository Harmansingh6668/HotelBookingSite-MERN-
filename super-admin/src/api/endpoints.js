
export const ENDPOINTS = {
  // Authentication
  login: "/auth/login",
  register: "/auth/register",


  dashboard: {
    hotels: "/hotels",
    hotelCount: "/hotels/count"
  },
  // Hotels
  hotels: "/hotels",
  hotelById: (id) => `/hotels/${id}`,
  hotelCount: "/hotels/count",

  // Managers / Users
  users: "/users",

  usersByRole: (role) => `/users/role/${role}`,
  userById: (id) => `/users/${id}`,
  currentUser: "/users/me",
  // Bookings
  bookings: "/bookings",
  myBookings: "/bookings/my-bookings",
  bookingById: (id) => `/bookings/${id}`,

  // Rooms
  roomsByHotel: (hotelId) => `/rooms/hotel/${hotelId}`,
  roomById: (id) => `/rooms/${id}`,

  // Reviews
  reviews: "/reviews",
};