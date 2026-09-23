import { useMemo, useState, useEffect } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import BookingFilters from "../components/bookings/BookingFilters";
import BookingTable from "../components/bookings/BookingTable";
// import { bookings } from "../data/bookings";
import { getAdminBookings } from "../services/booking.service";
import { getAdminRoomById } from "../services/room.service";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN")
    : "Not available";

function Bookings() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchbookings = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminBookings();

      const backendBookings = Array.isArray(data?.bookings)
        ? data.bookings
        : [];
      const roomIds = [
        ...new Set(
          backendBookings.flatMap((booking) =>
            (Array.isArray(booking.rooms) ? booking.rooms : [])
              .map((bookedRoom) =>
                typeof bookedRoom.roomId === "object"
                  ? bookedRoom.roomId?._id
                  : bookedRoom.roomId
              )
              .filter(Boolean)
          )
        ),
      ];
      const roomResponses = await Promise.all(
        roomIds.map(async (roomId) => [
          roomId,
          (await getAdminRoomById(roomId)).room,
        ])
      );
      const roomById = new Map(roomResponses);

      const normalizedBookings = backendBookings.map((booking) => {
        const bookedRooms = Array.isArray(booking.rooms)
          ? booking.rooms
          : [];
        const rooms = bookedRooms.map((bookedRoom) => {
          const roomId =
            typeof bookedRoom.roomId === "object"
              ? bookedRoom.roomId?._id
              : bookedRoom.roomId;
          const roomData = roomById.get(roomId);

          return {
          id: roomId || null,
          roomData: roomData || null,
          roomNumber: roomData?.roomNumber || "Not available",
          roomType: roomData?.roomType || "Not available",
          pricePerNight: bookedRoom.pricePerNight ?? 0,
          capacity: roomData?.capacity ?? 0,
          guests: bookedRoom.guests ?? 0,
          totalAmount: bookedRoom.totalAmount ?? 0,
          };
        });
        const room = rooms[0] || {
          id: null,
          roomNumber: "Not available",
          roomType: "Not available",
          pricePerNight: 0,
          capacity: 0,
          guests: 0,
          totalAmount: 0,
        };
        const guestCount = bookedRooms.reduce(
          (total, bookedRoom) => total + (bookedRoom.guests || 0),
          0
        );

        return {
          id: booking._id,
          bookingId: booking._id,
          hotel: booking.hotelId,
          rooms,
          room,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          checkIn: formatDate(booking.checkInDate),
          checkOut: formatDate(booking.checkOutDate),
          createdAt: formatDate(booking.createdAt),
          guests: guestCount,
          nights: booking.totalNights ?? 0,
          totalAmount: booking.totalAmount ?? 0,
          status: booking.status || "Not available",
          paymentStatus: booking.paymentStatus || "Not available",
          guestName: booking.userId?.name ?? "Not available",
        };
      });

      setBookings(normalizedBookings);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchbookings();
  }, []);
console.log("Bookings data:", bookings); // Log the bookings data to the console
  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return bookings.filter((booking) => {
      // Search
      const matchesSearch =
        !searchValue ||
        booking.bookingId
          .toLowerCase()
          .includes(searchValue) ||
        booking.guestName
          .toLowerCase()
          .includes(searchValue);

      // Booking status
      const matchesStatus =
        status === "All" ||
        booking.status === status;

      // Payment status
      const matchesPayment =
        paymentStatus === "All" ||
        booking.paymentStatus === paymentStatus;

      // Date filter
      let matchesDate = true;

      const checkInDate = new Date(booking.checkInDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dateFilter === "Upcoming") {
        matchesDate =
          !Number.isNaN(checkInDate.getTime()) && checkInDate >= today;
      }
      if (dateFilter === "Past") {
        matchesDate =
          !Number.isNaN(checkInDate.getTime()) && checkInDate < today;
      }
      if (dateFilter === "Today") {
        matchesDate =
          !Number.isNaN(checkInDate.getTime()) &&
          checkInDate.toDateString() === today.toDateString();
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment &&
        matchesDate
      );
    });
  }, [
    search,
    status,
    paymentStatus,
    dateFilter,
    bookings,
  ]);
  const summaryCards = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: CalendarCheck,
      iconClass: "text-[var(--color-primary)]",
      bgClass: "bg-[var(--color-primary)]/10",
    },
    {
      label: "Confirmed",
      value: bookings.filter((booking) => booking.status === "CONFIRMED").length,
      icon: CheckCircle2,
      iconClass: "text-[var(--color-success)]",
      bgClass: "bg-[var(--color-success)]/10",
    },
    {
      label: "Pending",
      value: bookings.filter((booking) => booking.status === "PENDING").length,
      icon: Clock3,
      iconClass: "text-[var(--color-warning)]",
      bgClass: "bg-[var(--color-warning)]/10",
    },
    {
      label: "Cancelled",
      value: bookings.filter((booking) => booking.status === "CANCELLED").length,
      icon: XCircle,
      iconClass: "text-[var(--color-danger)]",
      bgClass: "bg-[var(--color-danger)]/10",
    },
  ];

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPaymentStatus("All");
    setDateFilter("All");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
          Bookings
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Manage reservations, guest stays and booking activity.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-[16px] border border-[var(--color-border)] bg-white p-4 sm:p-5"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${card.bgClass}`}
              >
                <Icon
                  size={20}
                  className={card.iconClass}
                />
              </div>

              {loading && (
                <div className="rounded-xl border border-[var(--color-border)] bg-white p-6 text-sm text-[var(--color-text-secondary)]">
                  Loading bookings...
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <p className="mt-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                {card.value}
              </p>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <BookingFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onClear={clearFilters}
      />

      {/* Result Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Showing{" "}
          <span className="font-medium text-[var(--color-text-primary)]">
            {filteredBookings.length}
          </span>{" "}
          booking
          {filteredBookings.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Table */}
      <BookingTable bookings={filteredBookings} />

    </div>
  );
}

export default Bookings;