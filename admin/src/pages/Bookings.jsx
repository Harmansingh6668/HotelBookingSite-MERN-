import { useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import BookingFilters from "../components/bookings/BookingFilters";
import BookingTable from "../components/bookings/BookingTable";
import { bookings } from "../data/bookings";

const summaryCards = [
  {
    label: "Total Bookings",
    value: 24,
    icon: CalendarCheck,
    iconClass: "text-[var(--color-primary)]",
    bgClass: "bg-[var(--color-primary)]/10",
  },
  {
    label: "Confirmed",
    value: 17,
    icon: CheckCircle2,
    iconClass: "text-[var(--color-success)]",
    bgClass: "bg-[var(--color-success)]/10",
  },
  {
    label: "Pending",
    value: 2,
    icon: Clock3,
    iconClass: "text-[var(--color-warning)]",
    bgClass: "bg-[var(--color-warning)]/10",
  },
  {
    label: "Cancelled",
    value: 5,
    icon: XCircle,
    iconClass: "text-[var(--color-danger)]",
    bgClass: "bg-[var(--color-danger)]/10",
  },
];

function Bookings() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

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

      if (dateFilter === "Upcoming") {
        matchesDate = booking.id !== "4";
      }

      if (dateFilter === "Past") {
        matchesDate = booking.id === "4";
      }

      if (dateFilter === "Today") {
        matchesDate = booking.id === "1";
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
  ]);

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