import { useEffect, useState } from "react";
import AvailabilityGrid from "../components/availability/AvailabilityGrid";
import { getAdminRooms } from "../services/room.service";
import {
  CalendarDays,
  BedDouble,
  CheckCircle2,
  Wrench,
} from "lucide-react";

const summaryCards = [
  {
    label: "Available",
    value: 18,
    icon: CheckCircle2,
    iconClass: "text-[var(--color-success)]",
    bgClass: "bg-[var(--color-success)]/10",
  },
  {
    label: "Booked",
    value: 10,
    icon: BedDouble,
    iconClass: "text-[var(--color-info)]",
    bgClass: "bg-[var(--color-info)]/10",
  },
  {
    label: "Maintenance",
    value: 2,
    icon: Wrench,
    iconClass: "text-[var(--color-warning)]",
    bgClass: "bg-[var(--color-warning)]/10",
  },
];

const legend = [
  {
    label: "Available",
    color: "bg-[var(--color-success)]",
  },
  {
    label: "Booked",
    color: "bg-[var(--color-info)]",
  },
  {
    label: "Maintenance",
    color: "bg-[var(--color-warning)]",
  },
];

function Availability() {
    const [currentWeek, setCurrentWeek] = useState(0);
    const [roomType, setRoomType] = useState("All");
    const [status, setStatus] = useState("All");
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
      getAdminRooms()
        .then(({ rooms: data = [] }) => setRooms(data))
        .catch((fetchError) => setError(fetchError.message));
    }, []);

    const counts = rooms.reduce((result, room) => {
      const normalized = String(room.status || "").toUpperCase();
      const key = normalized === "BOOKED" || normalized === "OCCUPIED"
        ? "Booked"
        : normalized.charAt(0) + normalized.slice(1).toLowerCase();
      if (result[key] !== undefined) result[key] += 1;
      return result;
    }, { Available: 0, Booked: 0, Maintenance: 0 });
    const availableRoomTypes = [
      ...new Set(rooms.map((room) => room.roomType).filter(Boolean)),
    ];
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays
              size={22}
              className="text-[var(--color-primary)]"
            />

            <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              Availability
            </h1>
          </div>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Manage room availability and track occupancy across your property.
          </p>
        </div>

       <div className="flex items-center gap-2">
         <button
           type="button"
           onClick={() => setCurrentWeek(0)}
           className="rounded-[10px] border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
         >
           Today
         </button>
       </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-[16px] border border-[var(--color-border)] bg-white p-4 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-[10px] ${card.bgClass}`}
                >
                  <Icon
                    size={20}
                    className={card.iconClass}
                  />
                </div>
              </div>

              <p className="mt-4 text-2xl font-semibold text-[var(--color-text-primary)]">
                {counts[card.label] || 0}
              </p>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {card.label} rooms
              </p>
            </div>
          );
        })}
      </div>
      {error && <p className="text-sm text-[var(--color-danger)]">Unable to load rooms: {error}</p>}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[14px] border border-[var(--color-border)] bg-white px-4 py-4">
        <span className="text-sm font-medium text-[var(--color-text-primary)]">
          Status:
        </span>

        {legend.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${item.color}`}
            />

            <span className="text-xs text-[var(--color-text-secondary)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

        <div className="flex flex-col gap-3 rounded-[14px] border border-[var(--color-border)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
                Filter Rooms
                </h2>

                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                Narrow the availability view.
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

                <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="rounded-[10px] border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                >
                <option value="All">All Room Types</option>
                {availableRoomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
                </select>

                <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-[10px] border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">Maintenance</option>
                </select>

            </div>
            </div>

      {/* Availability Grid */}
      <AvailabilityGrid  
        rooms={rooms}
        currentWeek={currentWeek}
        roomType={roomType}
        status={status}
        setCurrentWeek={setCurrentWeek}
      />

    </div>
  );
}

export default Availability;