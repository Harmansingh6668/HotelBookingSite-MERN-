import {
  BedDouble,
  CalendarCheck,
  CalendarDays,
  Clock3,
  IndianRupee,
  LogIn,
  LogOut,
  MoreHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAdminBookings,
  getAdminDashboard,
} from "../services/booking.service";
import { getAdminRooms } from "../services/room.service";

const statDefinitions = [
  {
    title: "Total Bookings",
    icon: CalendarCheck,
  },
  {
    title: "Revenue",
    icon: IndianRupee,
  },
  {
    title: "Occupancy",
    icon: BedDouble,
  },
  {
    title: "Available Rooms",
    icon: CalendarDays,
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-primary)]">
          <Icon size={20} strokeWidth={1.8} />
        </div>

        {stat.change && (
          <span className="text-xs font-medium text-[var(--color-text-muted)]">
            {stat.change}
          </span>
        )}
      </div>

      <p className="mt-5 text-sm text-[var(--color-text-secondary)]">
        {stat.title}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
        {stat.value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const label =
    status?.charAt(0).toUpperCase() +
      status?.slice(1).toLowerCase() || "Unknown";

  const styles = {
    Confirmed:
      "bg-[#EAF5EF] text-[var(--color-success)]",
    Pending:
      "bg-[#FFF6E5] text-[var(--color-warning)]",
    Ready:
      "bg-[#EAF5EF] text-[var(--color-success)]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[label] ||
        "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
      }`}
    >
      {label}
    </span>
  );
}

function ActivityTable({ title, icon: Icon, data, actionText }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
        <div className="flex items-center gap-2">
          <Icon
            size={18}
            className="text-[var(--color-primary)]"
            strokeWidth={1.8}
          />

          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {title}
          </h2>
        </div>

        <button className="text-xs font-medium text-[var(--color-primary)] hover:underline">
          {actionText}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Guest
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Room
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Guests
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Time
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-muted)]"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {item.guest}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                  {item.room}
                </td>

                <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                  {item.guests}
                </td>

                <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                  {item.time}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingChart({ bookings }) {
  const today = new Date();
  const bars = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - (6 - index));

    return {
      label: date.toLocaleDateString("en-IN", {
        weekday: "short",
      }),
      value: bookings.filter((booking) => {
        const bookingDate = new Date(
          booking.createdAt || booking.checkInDate
        );
        return bookingDate.toDateString() === date.toDateString();
      }).length,
    };
  });
  const maximum = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Booking Overview
          </h2>

          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Booking activity over the last 7 days
          </p>
        </div>

        <select
          defaultValue="7"
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs text-[var(--color-text-secondary)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
        </select>
      </div>

      <div className="mt-8 flex h-56 items-end gap-3 sm:gap-5">
        {bars.map((bar) => (
          <div
            key={bar.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-lg bg-[var(--color-primary)] opacity-90 transition hover:opacity-100"
                style={{
                  height: `${Math.max((bar.value / maximum) * 100, 4)}%`,
                }}
              />
            </div>

            <span className="text-xs text-[var(--color-text-muted)]">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomStatus({ rooms: roomData }) {
  const total = roomData.length;
  const rooms = [
    {
      label: "Available",
      count: roomData.filter((room) => room.status === "AVAILABLE").length,
      total,
      color: "bg-[var(--color-success)]",
    },
    {
      label: "Occupied",
      count: roomData.filter((room) => ["BOOKED", "OCCUPIED"].includes(room.status)).length,
      total,
      color: "bg-[var(--color-primary)]",
    },
    {
      label: "Maintenance",
      count: roomData.filter((room) => room.status === "MAINTENANCE").length,
      total,
      color: "bg-[var(--color-warning)]",
    },
    {
      label: "Unavailable",
      count: roomData.filter((room) => !["AVAILABLE", "BOOKED", "OCCUPIED", "MAINTENANCE"].includes(room.status)).length,
      total,
      color: "bg-[var(--color-danger)]",
    },
  ];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Room Status
          </h2>

          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Current room inventory
          </p>
        </div>

        <button className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {rooms.map((room) => {
          const percentage = room.total
            ? (room.count / room.total) * 100
            : 0;

          return (
            <div key={room.label}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${room.color}`} />

                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {room.label}
                  </span>
                </div>

                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {room.count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
                <div
                  className={`h-full rounded-full ${room.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { useHotel } from "../context/HotelContext";
function Dashboard() {
  const { hotel, error: hotelError } = useHotel();
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    Promise.all([
      getAdminDashboard(),
      getAdminBookings(),
      getAdminRooms(),
    ])
      .then(([dashboardResponse, bookingResponse, roomResponse]) => {
        setDashboardStats(dashboardResponse.dashboard?.statistics || null);
        setBookings(bookingResponse.bookings || []);
        setRooms(
          (roomResponse.rooms || []).map((room) => ({
            ...room,
            status: String(room.status || "UNAVAILABLE").toUpperCase(),
          }))
        );
      })
      .catch((error) => setDataError(error.message));
  }, []);

  const today = new Date();
  const isToday = (value) => {
    if (!value) return false;
    const date = new Date(value);
    return date.toDateString() === today.toDateString();
  };
  const formatTime = (value) =>
    value
      ? new Date(value).toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
        })
      : "Not available";
  const activityRows = (dateField, status) =>
    bookings
      .filter((booking) => isToday(booking[dateField]))
      .map((booking, index) => {
        const firstRoom = booking.rooms?.[0];
        return {
          id: booking._id || `${dateField}-${index}`,
          guest: booking.userId?.name || "Not available",
          room: String(firstRoom?.roomId?.roomNumber ?? "Not available"),
          guests:
            booking.rooms?.reduce((total, room) => total + (room.guests || 0), 0) || 0,
          time: formatTime(booking[dateField]),
          status: status || booking.status || "Not available",
        };
      });
  const checkIns = activityRows("checkInDate");
  const checkOuts = activityRows("checkOutDate", "Ready");
  const availableRooms = rooms.filter((room) => room.status === "AVAILABLE").length;
  const occupiedRooms = rooms.filter((room) =>
    ["BOOKED", "OCCUPIED"].includes(room.status)
  ).length;
  const pendingActions = bookings.filter((booking) => booking.status === "PENDING").length;
  const stats = statDefinitions.map((definition, index) => ({
    ...definition,
    value: [
      dashboardStats?.totalBookings ?? bookings.length,
      `₹${bookings
        .reduce(
          (total, booking) =>
            total + (Number(booking.totalAmount) || 0),
          0
        )
        .toLocaleString("en-IN")}`,
      `${rooms.length ? Math.round((occupiedRooms / rooms.length) * 100) : 0}%`,
      `${dashboardStats?.availableRooms ?? availableRooms} / ${
        dashboardStats?.totalRooms ?? rooms.length
      }`,
    ][index],
    change: index === 3 ? "Current inventory" : "",
  }));

  const greeting =
    today.getHours() < 12
      ? "Good morning"
      : today.getHours() < 18
        ? "Good afternoon"
        : "Good evening";
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-medium text-[var(--color-gold)]">
            {formattedDate}
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
            {greeting}, Manager
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {hotel
              ? `Here's what's happening at ${hotel.name} today.`
              : "Loading your hotel information..."}
          </p>

          {hotelError && (
            <p className="mt-2 text-sm text-[var(--color-danger)]">
              Unable to load hotel information: {hotelError}
            </p>
          )}
          {dataError && (
            <p className="mt-2 text-sm text-[var(--color-danger)]">
              Unable to load dashboard data: {dataError}
            </p>
          )}
        </div>

        {hotel && (
          <div className="max-w-xl rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                {hotel.name}
              </h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  hotel.status === "ACTIVE"
                    ? "bg-[#EAF5EF] text-[var(--color-success)]"
                    : "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
                }`}
              >
                {hotel.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {[hotel.address, hotel.city, hotel.country]
                .filter(Boolean)
                .join(" • ") || "Hotel details unavailable"}
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              ★ {hotel.rating ?? 0} ({hotel.reviewsCount ?? 0} reviews)
            </p>
          </div>
        )}
        </div>
      {/* KPI Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Today's Operations */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5EF] text-[var(--color-success)]">
              <LogIn size={19} />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Today&apos;s Check-ins
              </p>

              <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                {checkIns.length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF4F7] text-[var(--color-info)]">
              <LogOut size={19} />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Today&apos;s Check-outs
              </p>

              <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                {checkOuts.length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF6E5] text-[var(--color-warning)]">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Pending Actions
              </p>

              <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                {dashboardStats?.pendingBookings ?? pendingActions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Room Status */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <BookingChart bookings={bookings} />
        <RoomStatus rooms={rooms} />
      </div>

      {/* Activity */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ActivityTable
          title="Today's Check-ins"
          icon={LogIn}
          data={checkIns}
          actionText="View all"
        />

        <ActivityTable
          title="Today's Check-outs"
          icon={LogOut}
          data={checkOuts}
          actionText="View all"
        />
      </div>
    </div>

  );
}

export default Dashboard;