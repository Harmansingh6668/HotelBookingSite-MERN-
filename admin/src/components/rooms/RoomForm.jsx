import { useState } from "react";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { uploadAdminRoomImage } from "../../services/room.service";

const ROOM_TYPES = ["SINGLE", "DOUBLE", "DELUXE", "SUITE", "FAMILY"];
const BED_TYPES = ["SINGLE", "DOUBLE", "QUEEN", "KING"];
const STATUSES = ["AVAILABLE", "BOOKED", "MAINTENANCE"];

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const isFormComplete =
    formData.roomNumber.trim() !== "" &&
    Number.isFinite(Number(formData.roomNumber)) &&
    Number(formData.roomNumber) > 0 &&
    Boolean(formData.roomType) &&
    formData.description.trim() !== "" &&
    Number.isFinite(Number(formData.capacity)) &&
    Number(formData.capacity) >= 1 &&
    Boolean(formData.bedType) &&
    formData.price !== "" &&
    Number.isFinite(Number(formData.price)) &&
    Number(formData.price) >= 0;

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

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";

    if (!files.length) return;

    setIsUploadingImages(true);
    setUploadError("");

    try {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} is larger than the 5 MB limit.`);
        }

        const response = await uploadAdminRoomImage(file);
        if (!response?.image) {
          throw new Error(`The server did not return an image URL for ${file.name}.`);
        }

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, response.image],
        }));
      }
    } catch (error) {
      setUploadError(error.message || "Unable to upload room image.");
    } finally {
      setIsUploadingImages(false);
    }
  };

  const addImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const updateImageUrl = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((image, imageIndex) =>
        imageIndex === index ? value : image
      ),
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      setSubmitError("Complete all required room fields before saving.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      if (onSubmit) {
        await onSubmit({
          ...formData,
          images: formData.images.map((image) => image.trim()).filter(Boolean),
        });
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
              type="number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="e.g. 101"
              min="1"
              step="1"
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
                  {type.charAt(0) + type.slice(1).toLowerCase()}
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
                  {type.charAt(0) + type.slice(1).toLowerCase()}
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
                  {status.charAt(0) + status.slice(1).toLowerCase()}
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
            required
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
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Room Images
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Upload photos to Cloudinary or add image URLs.
            </p>
          </div>
          <button
            type="button"
            onClick={addImageUrl}
            className="rounded-lg border border-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
          >
            + Add image URL
          </button>
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
            JPEG, PNG, WebP, or GIF; maximum 5 MB per photo.
          </p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={handleImageChange}
            disabled={isUploadingImages}
            className="hidden"
          />
        </label>

        {isUploadingImages && (
          <p className="mt-3 text-sm text-[var(--color-primary)]">
            Uploading photos to Cloudinary...
          </p>
        )}
        {uploadError && (
          <p role="alert" className="mt-3 text-sm text-[var(--color-danger)]">
            {uploadError}
          </p>
        )}

        {formData.images.length > 0 && (
          <div className="mt-5 space-y-4">
            {formData.images.map((image, index) => (
              <div
                key={index}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor={`room-image-${index}`}
                    className="text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Image {index + 1} URL
                  </label>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-sm text-[var(--color-danger)]"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
                <input
                  id={`room-image-${index}`}
                  type="url"
                  value={image}
                  onChange={(event) => updateImageUrl(index, event.target.value)}
                  placeholder="https://example.com/room-photo.jpg"
                  className={inputClass}
                />
                {image && (
                  <img
                    src={image}
                    alt={`Room image ${index + 1}`}
                    className="mt-3 h-40 w-full rounded-lg object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>
            ))}
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
          disabled={isSubmitting || isUploadingImages || !isFormComplete}
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