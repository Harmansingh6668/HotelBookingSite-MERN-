import { Link } from "react-router-dom";

import {
  BedDouble,
  CheckCircle2,
  CircleDollarSign,
  Link2OffIcon,
  MoreHorizontal,
  Pencil,
  Search,
  Settings2,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";

const rooms = [
  {
    id: 1,
    number: "101",
    type: "Deluxe Room",
    capacity: 2,
    price: 3500,
    status: "Available",
  },
  {
    id: 2,
    number: "102",
    type: "Deluxe Room",
    capacity: 2,
    price: 3500,
    status: "Occupied",
  },
  {
    id: 3,
    number: "103",
    type: "Deluxe Room",
    capacity: 2,
    price: 3500,
    status: "Available",
  },
  {
    id: 4,
    number: "201",
    type: "Suite",
    capacity: 4,
    price: 6500,
    status: "Available",
  },
  {
    id: 5,
    number: "202",
    type: "Suite",
    capacity: 4,
    price: 6500,
    status: "Occupied",
  },
  {
    id: 6,
    number: "301",
    type: "Premium Room",
    capacity: 3,
    price: 5200,
    status: "Maintenance",
  },
  {
    id: 7,
    number: "302",
    type: "Premium Room",
    capacity: 3,
    price: 5200,
    status: "Available",
  },
  {
    id: 8,
    number: "303",
    type: "Premium Room",
    capacity: 3,
    price: 5200,
    status: "Unavailable",
  },
];

const statusStyles = {
  Available: {
    badge: "bg-[#EAF5EF] text-[var(--color-success)]",
    dot: "bg-[var(--color-success)]",
  },
  Occupied: {
    badge: "bg-[#EDF4F7] text-[var(--color-info)]",
    dot: "bg-[var(--color-info)]",
  },
  Maintenance: {
    badge: "bg-[#FFF6E5] text-[var(--color-warning)]",
    dot: "bg-[var(--color-warning)]",
  },
  Unavailable: {
    badge: "bg-[#FBEDED] text-[var(--color-danger)]",
    dot: "bg-[var(--color-danger)]",
  },
};

function StatusBadge({ status }) {
  const style = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

function SummaryCard({ icon: Icon, label, value, description, iconClass }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-5 text-sm text-[var(--color-text-secondary)]">
        {label}
      </p>

      <div className="mt-1 flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
          {value}
        </p>

        <p className="text-xs text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Rooms() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || room.status === statusFilter;

    const matchesType =
      typeFilter === "All" || room.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[var(--color-gold)]">
            Property
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
            Rooms
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Manage rooms, availability, pricing, and room status.
          </p>
        </div>

        <Link
          to="/rooms/new"
          className="inline-flex w-fit items-center gap-2 rounded-[10px] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          <BedDouble size={17} />
          Add Room
        </Link>
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={BedDouble}
          label="Total Rooms"
          value="32"
          description="Property"
          iconClass="bg-[var(--color-surface-muted)] text-[var(--color-primary)]"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Available"
          value="18"
          description="Today"
          iconClass="bg-[#EAF5EF] text-[var(--color-success)]"
        />

        <SummaryCard
          icon={Users}
          label="Occupied"
          value="10"
          description="Today"
          iconClass="bg-[#EDF4F7] text-[var(--color-info)]"
        />

        <SummaryCard
          icon={Wrench}
          label="Maintenance"
          value="2"
          description="Currently"
          iconClass="bg-[#FFF6E5] text-[var(--color-warning)]"
        />
      </div>

      {/* Room table */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-[var(--color-border)] p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search room number or type..."
                className="
                  h-10 w-full rounded-[10px]
                  border border-[var(--color-border)]
                  bg-white pl-10 pr-3
                  text-sm text-[var(--color-text-primary)]
                  outline-none
                  placeholder:text-[var(--color-text-muted)]
                  focus:border-[var(--color-primary)]
                  focus:ring-4 focus:ring-[rgba(11,79,58,0.08)]
                "
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Settings2
                  size={16}
                  className="text-[var(--color-text-muted)]"
                />

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="
                    h-10 rounded-[10px]
                    border border-[var(--color-border)]
                    bg-white px-3
                    text-sm text-[var(--color-text-secondary)]
                    outline-none
                    focus:border-[var(--color-primary)]
                  "
                >
                  <option value="All">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="
                  h-10 rounded-[10px]
                  border border-[var(--color-border)]
                  bg-white px-3
                  text-sm text-[var(--color-text-secondary)]
                  outline-none
                  focus:border-[var(--color-primary)]
                "
              >
                <option value="All">All Room Types</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Premium Room">Premium Room</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]/50">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-[var(--color-text-secondary)]">
                  Room
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold text-[var(--color-text-secondary)]">
                  Room Type
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold text-[var(--color-text-secondary)]">
                  Capacity
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold text-[var(--color-text-secondary)]">
                  Price / Night
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-semibold text-[var(--color-text-secondary)]">
                  Status
                </th>

                <th className="px-5 py-3.5 text-right text-xs font-semibold text-[var(--color-text-secondary)]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-muted)]/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-surface-muted)] text-[var(--color-primary)]">
                        <BedDouble size={17} />
                      </div>

                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {room.number}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                    {room.type}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                      <Users size={15} />
                      {room.capacity} Guests
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)]">
                      <CircleDollarSign size={15} />
                      ₹{room.price.toLocaleString("en-IN")}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={room.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/rooms/${room.id}`}
                      className="rounded-lg p-2 text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
                      title={`Manage room ${room.number}`}
                    >
                      <MoreHorizontal size={19} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRooms.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                No rooms found
              </p>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-[var(--color-border)] md:hidden">
          {filteredRooms.map((room) => (
            <div key={room.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-surface-muted)] text-[var(--color-primary)]">
                    <BedDouble size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      Room {room.number}
                    </p>

                    <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                      {room.type}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/rooms/${room.id}`}
                  className="rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)]"
                >
                  <MoreHorizontal size={18} />
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[var(--color-surface-muted)] p-3">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Capacity
                  </p>

                  <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                    {room.capacity} Guests
                  </p>
                </div>

                <div className="rounded-lg bg-[var(--color-surface-muted)] p-3">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Price
                  </p>

                  <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                    ₹{room.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <StatusBadge status={room.status} />

                <Link
                  to={`/rooms/${room.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-primary)]"
                >
                  <Pencil size={14} />
                  Manage 
                </Link>
              </div>
            </div>
          ))}

          {filteredRooms.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                No rooms found
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Rooms;