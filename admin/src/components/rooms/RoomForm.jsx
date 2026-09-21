import { useState } from "react";
import { ArrowLeft, ImagePlus, X } from "lucide-react";
import { Link } from "react-router-dom";

const ROOM_TYPES = ["Deluxe", "Suite", "Premium", "Standard"];
const BED_TYPES = ["King Bed", "Queen Bed", "Twin Beds", "Single Bed"];
const STATUSES = ["Available", "Occupied", "Maintenance", "Unavailable"];

const AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "TV",
  "Mini Bar",
  "Room Service",
  "Breakfast",
  "Balcony",
  "Bathtub",
];

function RoomForm({ initialData = null, isEdit = false, onSubmit }) {
  const [formData, setFormData] = useState({
    roomNumber: initialData?.roomNumber || "",
    roomType: initialData?.roomType || "",
    description: initialData?.description || "",
    capacity: initialData?.capacity || "",
    price: initialData?.price || "",
    bedType: initialData?.bedType || "",
    amenities: initialData?.amenities || [],
    status: initialData?.status || "Available",
    images: initialData?.images || [],
  });

  const [imagePreviews, setImagePreviews] = useState(
    initialData?.images || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImagePreviews((prev) => [...prev, ...previews]);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setSubmitError("");

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        console.log("Room data:", formData);
      }

    } catch (error) {
      console.error("Failed to save room:", error);
      setSubmitError(
        error.message || "Unable to save the room. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-[10px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10";

  const labelClass =
    "text-sm font-medium text-[var(--color-text-primary)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/rooms"
          className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
            {isEdit ? "Edit Room" : "Add New Room"}
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {isEdit
              ? "Update the details of this room."
              : "Add a new room to your property."}
          </p>
        </div>
      </div>

      {submitError && (
        <div
          className="rounded-[10px] border border-[#E8B7B7] bg-[#FBEAEA] px-4 py-3 text-sm font-medium text-[#B64A4A]"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* Basic Information */}
      <section className="rounded-[18px] border border-[var(--color-border)] bg-white p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Enter the basic details of the room.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Room Number */}
          <div>
            <label className={labelClass}>
              Room Number
            </label>

            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="e.g. 101"
              className={inputClass}
              required
            />
          </div>

          {/* Room Type */}
          <div>
            <label className={labelClass}>
              Room Type
            </label>

            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select room type</option>

              {ROOM_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity */}
          <div>
            <label className={labelClass}>
              Guest Capacity
            </label>

            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="e.g. 2"
              min="1"
              className={inputClass}
              required
            />
          </div>

          {/* Bed Type */}
          <div>
            <label className={labelClass}>
              Bed Type
            </label>

            <select
              name="bedType"
              value={formData.bedType}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select bed type</option>

              {BED_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className={labelClass}>
              Price per Night
            </label>

            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-secondary)]">
                ₹
              </span>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="3500"
                min="0"
                className="w-full rounded-[10px] border border-[var(--color-border)] bg-white py-3 pl-9 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/10"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>
              Room Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Description */}
        <div className="mt-5">
          <label className={labelClass}>
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the room, its view, features and overall experience..."
            rows="5"
            className={`${inputClass} resize-none`}
          />

          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            Keep the description clear and useful for guests.
          </p>
        </div>
      </section>

      {/* Amenities */}
      <section className="rounded-[18px] border border-[var(--color-border)] bg-white p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Room Amenities
          </h2>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Select the facilities available in this room.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {AMENITIES.map((amenity) => {
            const selected = formData.amenities.includes(amenity);

            return (
              <label
                key={amenity}
                className={`flex cursor-pointer items-center gap-3 rounded-[10px] border p-3 text-sm transition ${
                  selected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]"
                    : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleAmenityChange(amenity)}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />

                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Images */}
      <section className="rounded-[18px] border border-[var(--color-border)] bg-white p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Room Images
          </h2>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Add photos that represent this room.
          </p>
        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-[14px] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] px-6 py-10 text-center transition hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5">
          <ImagePlus
            size={28}
            className="text-[var(--color-primary)]"
          />

          <p className="mt-3 text-sm font-medium text-[var(--color-text-primary)]">
            Upload room photos
          </p>

          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            PNG, JPG or WEBP
          </p>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {imagePreviews.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {imagePreviews.map((image, index) => {
              const imageUrl =
                typeof image === "string" ? image : image.url;

              return (
                <div
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-[12px] border border-[var(--color-border)]"
                >
                  <img
                    src={imageUrl}
                    alt={`Room preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          to="/rooms"
          className="rounded-[10px] border border-[var(--color-border)] bg-white px-5 py-3 text-center text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)]"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-[10px] bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? isEdit
              ? "Saving..."
              : "Adding..."
            : isEdit
              ? "Save Changes"
              : "Add Room"}
        </button>
      </div>

    </form>
  );
}

export default RoomForm;