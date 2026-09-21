import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../ui/Button";
import MissingFieldsModal from "../missingModel/MissingFeildModal";
import { useFormValidation } from "../missingModel/useFormValidation";
import { useBooking } from "../../context/BookingContext";

const formatDateInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addDays = (dateValue, days) => {
  const date = new Date(`${dateValue}T00:00:00`);
  date.setDate(date.getDate() + days);

  return formatDateInput(date);
};

function SearchBox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setSearch } = useBooking();
  const today = formatDateInput(new Date());
  const { missingFields, isModalOpen, closeModal, validateForm } =
    useFormValidation();

  const [searchData, setSearchData] = useState({
    destination: searchParams.get("destination") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guests: Number(searchParams.get("adults") || searchParams.get("guests")) || 2,
    rooms: Number(searchParams.get("rooms")) || 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchData((prev) => {
      if (name === "checkIn") {
        const nextCheckOut =
          value && (!prev.checkOut || prev.checkOut <= value)
            ? addDays(value, 1)
            : prev.checkOut;

        return {
          ...prev,
          checkIn: value,
          checkOut: nextCheckOut,
        };
      }

      if (name === "checkOut" && prev.checkIn && value <= prev.checkIn) {
        return {
          ...prev,
          checkOut: addDays(prev.checkIn, 1),
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const isValid = validateForm(searchData, {
      destination: "Destination",
      checkIn: "Check-in date",
      checkOut: "Check-out date",
      guests: "Guests",
      rooms: "Rooms",
    });

    if (!isValid) return;

    const params = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      adults: String(searchData.guests),
      rooms: String(searchData.rooms),
    });

    setSearch({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      adults: Number(searchData.guests),
      rooms: Number(searchData.rooms),
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-8 rounded-[10px] border border-white/70 bg-white p-3 shadow-2xl shadow-[#083D2D]/20 sm:p-4 w-full"
    >
      <div className="grid gap-3 md:grid-cols-[1.45fr_1fr_1fr_0.7fr_0.7fr_auto]">
        <label className="flex flex-col gap-1.5 rounded-[10px] border border-[#DDE5DF] bg-[#FAF8F2] px-4 py-3 transition-all focus-within:border-[#0B4F3A] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0B4F3A]/10">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#66736D]">
            Destination
          </span>
          <input
            name="destination"
            value={searchData.destination}
            onChange={handleChange}
            placeholder="Where are you going?"
            className="w-full bg-transparent text-sm font-medium text-[#1F2925] outline-none placeholder:text-[#8A958F]"
          />
        </label>

        <label className="flex flex-col gap-1.5 rounded-[10px] border border-[#DDE5DF] bg-[#FAF8F2] px-4 py-3 transition-all focus-within:border-[#0B4F3A] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0B4F3A]/10">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#66736D]">
            Check In
          </span>
          <input
            name="checkIn"
            type="date"
            value={searchData.checkIn}
            onChange={handleChange}
            min={today}
            className="w-full bg-transparent text-sm font-medium text-[#1F2925] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1.5 rounded-[10px] border border-[#DDE5DF] bg-[#FAF8F2] px-4 py-3 transition-all focus-within:border-[#0B4F3A] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0B4F3A]/10">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#66736D]">
            Check Out
          </span>
          <input
            name="checkOut"
            type="date"
            value={searchData.checkOut}
            onChange={handleChange}
            min={searchData.checkIn ? addDays(searchData.checkIn, 1) : today}
            className="w-full bg-transparent text-sm font-medium text-[#1F2925] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1.5 rounded-[10px] border border-[#DDE5DF] bg-[#FAF8F2] px-4 py-3 transition-all focus-within:border-[#0B4F3A] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0B4F3A]/10">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#66736D]">
            Guests
          </span>
          <input
            name="guests"
            type="number"
            min="1"
            max="12"
            value={searchData.guests}
            onChange={handleChange}
            className="w-full bg-transparent text-sm font-medium text-[#1F2925] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1.5 rounded-[10px] border border-[#DDE5DF] bg-[#FAF8F2] px-4 py-3 transition-all focus-within:border-[#0B4F3A] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0B4F3A]/10">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#66736D]">
            Rooms
          </span>
          <input
            name="rooms"
            type="number"
            min="1"
            max="10"
            value={searchData.rooms}
            onChange={handleChange}
            className="w-full bg-transparent text-sm font-medium text-[#1F2925] outline-none"
          />
        </label>

        <Button type="submit" className="justify-center px-6 py-4 md:h-full">
          Search
        </Button>
      </div>
      <MissingFieldsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        missingFields={missingFields}
        description="Please complete your search details before looking for hotels."
      />
    </form>
  );
}

export default SearchBox;
