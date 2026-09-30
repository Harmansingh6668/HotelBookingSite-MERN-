
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

  superAdmin: {
    dashboard: "/super-admin/dashboard",

    hotels: "/super-admin/hotels",
    hotelById: (id) => `/super-admin/hotels/${id}`,
    hotelStatus: (id) => `/super-admin/hotels/${id}/status`,

    createHotelAdmin: "/super-admin/hotel-admins",

    hotelAdmins: "/super-admin/hotel-admins",
    hotelAdminById: (id) => `/super-admin/hotel-admins/${id}`,
    hotelAdminStatus: (id) =>
      `/super-admin/hotel-admins/${id}/status`,

    bookings: "/super-admin/bookings",
    bookingById: (id) => `/super-admin/bookings/${id}`,
  },
};