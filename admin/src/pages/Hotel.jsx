import {
  BedDouble,
  CheckCircle2,
  Clock3,
  MapPin,
  Pencil,
  Phone,
  Star,
  Users,
  Wifi,
} from "lucide-react";

const hotel = {
  name: "The Grand Amritsar",
  location: "Amritsar, Punjab",
  rating: "4.8",
  reviews: 128,
  description:
    "A comfortable and elegant stay in the heart of Amritsar, offering modern rooms, warm hospitality, and convenient access to the city's major attractions.",
  status: "Active",
  rooms: 32,
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  phone: "+91 98765 43210",
};

const amenities = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Swimming Pool",
  "Restaurant",
  "Room Service",
  "Parking",
  "24/7 Front Desk",
  "Breakfast",
];

function Hotel() {
  return (
    <div className="mx-auto max-w-[1500px]">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-[var(--color-gold)]">
          Property
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
          My Hotel
        </h1>

        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Manage your property's information, amenities, and presentation.
        </p>
      </div>

      {/* Hotel Hero */}
      <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
        {/* Cover Image */}
        <div className="relative h-56 sm:h-72 lg:h-80">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
            alt="The Grand Amritsar"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[var(--color-success)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                    Active
                  </span>
                </div>

                <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                  {hotel.name}
                </h2>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-white/90">
                  <MapPin size={15} />
                  {hotel.location}
                </div>
              </div>

              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 rounded-[10px] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-primary)] transition hover:bg-[var(--color-surface-muted)]"
              >
                <Pencil size={16} />
                Edit Hotel
              </button>
            </div>
          </div>
        </div>

        {/* Hotel Summary */}
        <div className="grid border-t border-[var(--color-border)] sm:grid-cols-3">
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] p-5 sm:border-b-0 sm:border-r">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF6E5] text-[var(--color-gold)]">
              <Star size={19} fill="currentColor" />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Guest Rating
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[var(--color-text-primary)]">
                {hotel.rating}
                <span className="ml-1 font-normal text-[var(--color-text-secondary)]">
                  ({hotel.reviews} reviews)
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-[var(--color-border)] p-5 sm:border-b-0 sm:border-r">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-primary)]">
              <BedDouble size={19} />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Total Rooms
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[var(--color-text-primary)]">
                {hotel.rooms} Rooms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-primary)]">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Check-in / Check-out
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[var(--color-text-primary)]">
                {hotel.checkIn} / {hotel.checkOut}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="mt-6 overflow-x-auto border-b border-[var(--color-border)]">
        <div className="flex min-w-max gap-7">
          <button className="border-b-2 border-[var(--color-primary)] px-1 pb-3 text-sm font-medium text-[var(--color-primary)]">
            Overview
          </button>

          <button className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
            Information
          </button>

          <button className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
            Amenities
          </button>

          <button className="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
            Photos
          </button>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* About */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            About Property
          </h2>

          <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
            {hotel.description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-[var(--color-surface-muted)] p-4">
              <MapPin
                size={19}
                className="text-[var(--color-primary)]"
              />

              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                  {hotel.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-[var(--color-surface-muted)] p-4">
              <Phone
                size={19}
                className="text-[var(--color-primary)]"
              />

              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Contact
                </p>

                <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">
                  {hotel.phone}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Information */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Quick Information
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">
                Check-in
              </span>

              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {hotel.checkIn}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">
                Check-out
              </span>

              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {hotel.checkOut}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">
                Total rooms
              </span>

              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {hotel.rooms}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">
                Guest rating
              </span>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-text-primary)]">
                <Star
                  size={14}
                  className="text-[var(--color-gold)]"
                  fill="currentColor"
                />
                {hotel.rating}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Amenities */}
      <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Amenities
            </h2>

            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Amenities currently displayed for your property.
            </p>
          </div>

          <button className="w-fit text-sm font-medium text-[var(--color-primary)] hover:underline">
            Manage amenities
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] p-3.5"
            >
              <CheckCircle2
                size={17}
                className="shrink-0 text-[var(--color-success)]"
              />

              <span className="text-sm text-[var(--color-text-secondary)]">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hotel;