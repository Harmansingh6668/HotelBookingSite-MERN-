import {
  ArrowLeft,
  Building2,
  CalendarDays,
  MapPin,
  UserCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { getHotelById } from "../../api/hotel.api";

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHotel = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getHotelById(id);

        const hotelData =
          response?.hotel ||
          response?.data ||
          response;

        setHotel(hotelData);
      } catch (err) {
        console.error(
          "Failed to load hotel:",
          err
        );

        setError(
          err?.data?.message ||
            err?.message ||
            "Unable to load hotel details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadHotel();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />

        <div className="mt-6 h-64 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="p-6 lg:p-8">

        <Link
          to="/hotels"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to hotels
        </Link>

        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="font-semibold text-red-800">
            Unable to load hotel
          </h1>

          <p className="mt-2 text-sm text-red-700">
            {error || "Hotel not found."}
          </p>
        </div>

      </div>
    );
  }

  const name = hotel.name || "Unnamed Hotel";

  const location =
    hotel.city ||
    hotel.location ||
    hotel.address?.city ||
    "Location unavailable";

  const status = hotel.status || "ACTIVE";

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <Link
        to="/hotels"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to hotels
      </Link>

      {/* Header */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
              <Building2 size={25} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-bold text-slate-900">
                  {name}
                </h1>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                    status === "ACTIVE"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {status}
                </span>

              </div>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin size={15} />
                {location}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Information */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        <InfoCard
          icon={UserCog}
          title="Manager"
          value="Not assigned"
          description="Manager information will be connected when the manager API is available."
        />

        <InfoCard
          icon={CalendarDays}
          title="Bookings"
          value="—"
          description="Hotel booking statistics will be connected to the booking API."
        />

        <InfoCard
          icon={Building2}
          title="Hotel ID"
          value={hotel._id || hotel.id || "N/A"}
          description="Unique hotel identifier."
        />

      </div>

      {/* Raw information */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">

        <h2 className="font-semibold text-slate-900">
          Hotel Information
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <Detail
            label="Name"
            value={hotel.name}
          />

          <Detail
            label="City"
            value={hotel.city}
          />

          <Detail
            label="Status"
            value={hotel.status}
          />

          <Detail
            label="Address"
            value={
              typeof hotel.address === "string"
                ? hotel.address
                : hotel.address?.street ||
                  "Not available"
            }
          />

          <Detail
            label="Created"
            value={
              hotel.createdAt
                ? new Date(
                    hotel.createdAt
                  ).toLocaleDateString("en-IN")
                : "Not available"
            }
          />

          <Detail
            label="Updated"
            value={
              hotel.updatedAt
                ? new Date(
                    hotel.updatedAt
                  ).toLocaleDateString("en-IN")
                : "Not available"
            }
          />

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
        <Icon size={19} />
      </div>

      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-1 truncate text-lg font-bold text-slate-900">
        {value || "Not available"}
      </p>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-700">
        {value || "Not available"}
      </p>
    </div>
  );
}

export default HotelDetails;