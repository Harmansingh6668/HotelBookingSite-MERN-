import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BedDouble,
  CheckCircle2,
  Clock3,
  Pencil,
  Users,
  Wifi,
  Wind,
  Tv,
  Coffee,
} from "lucide-react";

const roomData = {
  number: "204",
  type: "Deluxe Room",
  description:
    "A comfortable and spacious room designed for a relaxing stay, featuring modern amenities and a warm interior.",
  capacity: 2,
  price: 3500,
  status: "Available",
  size: "280 sq ft",
  bed: "King Bed",
  amenities: [
    {
      name: "Free Wi-Fi",
      icon: Wifi,
    },
    {
      name: "Air Conditioning",
      icon: Wind,
    },
    {
      name: "Smart TV",
      icon: Tv,
    },
    {
      name: "Breakfast",
      icon: Coffee,
    },
  ],
};

function RoomDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [notification, setNotification] = useState(
    location.state?.notification || ""
  );
  const incomingAmenities = location.state?.room?.amenities;
  const detailAmenities = Array.isArray(incomingAmenities)
    ? incomingAmenities.map((name) => ({ name, icon: Wifi }))
    : roomData.amenities;
  const displayedRoom = {
    ...roomData,
    ...location.state?.room,
    amenities: detailAmenities,
  };

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(() => {
      setNotification("");
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  return (
    <div className="mx-auto max-w-[1200px]">
      {notification && (
        <div
          className="mb-5 flex items-center justify-between gap-4 rounded-[12px] border border-[#B9DEC7] bg-[#EAF5EF] px-4 py-3 text-sm font-medium text-[var(--color-success)] shadow-sm"
          role="status"
          aria-live="polite"
        >
          <span>
            <span aria-hidden="true">✓ </span>
            {notification}
          </span>
          <button
            type="button"
            onClick={() => setNotification("")}
            className="text-lg leading-none text-[var(--color-success)]"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Back */}
      <Link
        to="/rooms"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-primary)]"
      >
        <ArrowLeft size={17} />
        Back to Rooms
      </Link>

      {/* Header */}
      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
              Room {displayedRoom.number}
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5EF] px-2.5 py-1 text-xs font-medium text-[var(--color-success)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
              {displayedRoom.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {displayedRoom.type}
          </p>
        </div>

        <Link
          to={`/rooms/${id}/edit`}
          state={{
            room: {
              id,
              roomNumber: displayedRoom.number,
              roomType: displayedRoom.type,
              description: displayedRoom.description,
              capacity: displayedRoom.capacity,
              price: displayedRoom.price,
              bedType: displayedRoom.bed,
              status: displayedRoom.status,
              amenities: displayedRoom.amenities.map((amenity) => amenity.name),
              images: [],
            },
          }}
          className="inline-flex w-fit items-center gap-2 rounded-[10px] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          <Pencil size={16} />
          Edit Room
        </Link>
      </div>

      {/* Image + Summary */}
      <div className="mt-7 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        {/* Images */}
        <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
          <div className="h-72 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
              alt={`Room ${displayedRoom.number}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 p-3">
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=500&q=80"
              alt="Room interior"
              className="h-20 w-full rounded-lg object-cover"
            />

            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=500&q=80"
              alt="Hotel room"
              className="h-20 w-full rounded-lg object-cover"
            />

            <img
              src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=500&q=80"
              alt="Room details"
              className="h-20 w-full rounded-lg object-cover"
            />
          </div>
        </section>

        {/* Room summary */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Room Information
          </h2>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-3">
                <BedDouble
                  size={18}
                  className="text-[var(--color-primary)]"
                />

                <span className="text-sm text-[var(--color-text-secondary)]">
                  Room Type
                </span>
              </div>

              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {displayedRoom.type}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-3">
                <Users
                  size={18}
                  className="text-[var(--color-primary)]"
                />

                <span className="text-sm text-[var(--color-text-secondary)]">
                  Capacity
                </span>
              </div>

              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {displayedRoom.capacity} Guests
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-3">
                <BedDouble
                  size={18}
                  className="text-[var(--color-primary)]"
                />

                <span className="text-sm text-[var(--color-text-secondary)]">
                  Bed
                </span>
              </div>

              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {displayedRoom.bed}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-3">
                <Clock3
                  size={18}
                  className="text-[var(--color-primary)]"
                />

                <span className="text-sm text-[var(--color-text-secondary)]">
                  Room Size
                </span>
              </div>

              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {displayedRoom.size}
              </span>
            </div>

            <div className="pt-1">
              <p className="text-xs text-[var(--color-text-muted)]">
                Price per night
              </p>

              <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
                ₹{displayedRoom.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Description */}
      <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
          Description
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
          {displayedRoom.description}
        </p>
      </section>

      {/* Amenities */}
      <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Room Amenities
            </h2>

            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Amenities available in this room.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {displayedRoom.amenities.map((amenity) => {
            const Icon = amenity.icon;

            return (
              <div
                key={amenity.name}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] p-4"
              >
                <Icon
                  size={18}
                  className="text-[var(--color-primary)]"
                />

                <span className="text-sm text-[var(--color-text-secondary)]">
                  {amenity.name}
                </span>

                <CheckCircle2
                  size={15}
                  className="ml-auto text-[var(--color-success)]"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Current status */}
      <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Room Status
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              This room is currently available for booking.
            </p>
          </div>

          <button
            type="button"
            className="w-fit rounded-[10px] border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            Change Status
          </button>
        </div>
      </section>
    </div>
  );
}

export default RoomDetails;