import { createContext, useCallback, useContext, useState } from "react";

const BookingContext = createContext(null);

const initialBooking = {
  search: {
    destination: "",
    checkIn: "",
    checkOut: "",
    adults: 0,
    children: 0,
    rooms: 0,
  },

  hotel: null,

  selectedRooms: [],

  booker: {
    fullName: "",
    email: "",
    phone: "",
  },

  specialRequests: "",

  pricing: null,

  status: "draft",
};

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(initialBooking);
  const setHotel = useCallback((hotel) => {
    setBooking((prev) => ({ ...prev, hotel }));
  }, []);
  const setSelectedRooms = useCallback((selectedRooms) => {
    setBooking((prev) => ({ ...prev, selectedRooms }));
  }, []);
  const setSearch = useCallback((searchData) => {
    setBooking((prev) => {
      const nextSearch = { ...prev.search, ...searchData };
      const hasChanged = Object.keys(nextSearch).some(
        (key) => nextSearch[key] !== prev.search[key]
      );

      return hasChanged ? { ...prev, search: nextSearch } : prev;
    });
  }, []);
  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        setSearch,
        setHotel,
        setSelectedRooms,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }

  return context;
}