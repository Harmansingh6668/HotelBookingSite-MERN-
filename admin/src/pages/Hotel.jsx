import { useEffect, useState } from "react";
import { BedDouble, CheckCircle2, Clock3, MapPin, Pencil, Star } from "lucide-react";
import { useHotel } from "../context/hotelContext";
import { updateAdminHotel } from "../services/hotel.service";
import { getAdminRooms } from "../services/room.service";

const textValue = (value) => value || "Not available";

function Hotel() {
  const { hotel, loading, error, refreshHotel } = useHotel();
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [form, setForm] = useState(null);

  useEffect(() => {
    getAdminRooms()
      .then((data) => setRooms(data.rooms || []))
      .catch(() => setRooms([]));
  }, []);

  if (loading) {
    return <p className="text-sm text-[var(--color-text-secondary)]">Loading hotel information...</p>;
  }

  if (error || !hotel) {
    return <p className="text-sm text-[var(--color-danger)]">Unable to load hotel information: {error || "Hotel not found"}</p>;
  }

  const images = Array.isArray(hotel.image) ? hotel.image : [];
  const amenities = Array.isArray(hotel.amenities) ? hotel.amenities : [];
  const location = [hotel.city, hotel.country].filter(Boolean).join(", ");

  const startEditing = () => {
    setForm({
      name: hotel.name || "",
      description: hotel.description || "",
      address: hotel.address || "",
      city: hotel.city || "",
      country: hotel.country || "",
      image: images.join(", "),
      amenities: amenities.join(", "),
      status: hotel.status || "ACTIVE",
    });
    setSaveError("");
    setEditing(true);
  };

  const saveHotel = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaveError("");

    try {
      await updateAdminHotel({
        ...form,
        image: form.image.split(",").map((item) => item.trim()).filter(Boolean),
        amenities: form.amenities.split(",").map((item) => item.trim()).filter(Boolean),
      });
      await refreshHotel();
      setEditing(false);
    } catch (saveError) {
      setSaveError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    ["name", "Name"],
    ["address", "Address"],
    ["city", "City"],
    ["country", "Country"],
    ["image", "Image URLs (comma separated)"],
    ["amenities", "Amenities (comma separated)"],
  ];

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-6">
        <p className="text-sm font-medium text-[var(--color-gold)]">Property</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">My Hotel</h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Manage your property&apos;s information, amenities, and presentation.</p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
        <div className="relative h-56 sm:h-72 lg:h-80">
          {images[0] ? (
            <img src={images[0]} alt={textValue(hotel.name)} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--color-surface-muted)] text-sm text-[var(--color-text-secondary)]">Not available</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[var(--color-success)]">{textValue(hotel.status)}</span>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{textValue(hotel.name)}</h2>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-white/90"><MapPin size={15} />{textValue(location)}</div>
              </div>
              <button type="button" onClick={startEditing} className="inline-flex w-fit items-center gap-2 rounded-[10px] bg-white px-4 py-2.5 text-sm font-medium text-[var(--color-primary)]"><Pencil size={16} />Edit Hotel</button>
            </div>
          </div>
        </div>

        <div className="grid border-t border-[var(--color-border)] sm:grid-cols-3">
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] p-5 sm:border-b-0 sm:border-r"><Star size={19} className="text-[var(--color-gold)]" fill="currentColor" /><div><p className="text-xs text-[var(--color-text-muted)]">Guest Rating</p><p className="text-sm font-semibold">{hotel.rating ?? 0} ({hotel.reviewsCount ?? 0} reviews)</p></div></div>
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] p-5 sm:border-b-0 sm:border-r"><BedDouble size={19} className="text-[var(--color-primary)]" /><div><p className="text-xs text-[var(--color-text-muted)]">Total Rooms</p><p className="text-sm font-semibold">{rooms.length}</p></div></div>
          <div className="flex items-center gap-3 p-5"><Clock3 size={19} className="text-[var(--color-primary)]" /><div><p className="text-xs text-[var(--color-text-muted)]">Check-in / Check-out</p><p className="text-sm font-semibold">Not available</p></div></div>
        </div>
      </section>

      {editing && (
        <form onSubmit={saveHotel} className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between"><h2 className="font-semibold">Edit Hotel</h2><button type="button" onClick={() => setEditing(false)} className="text-sm text-[var(--color-text-secondary)]">Cancel</button></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map(([field, label]) => <label key={field} className="text-sm font-medium">{label}<input value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 font-normal" /></label>)}
            <label className="text-sm font-medium">Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 font-normal"><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></label>
            <label className="text-sm font-medium sm:col-span-2">Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows="4" className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 font-normal" /></label>
          </div>
          {saveError && <p className="mt-4 text-sm text-[var(--color-danger)]">{saveError}</p>}
          <button type="submit" disabled={saving} className="mt-5 rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-white">{saving ? "Saving..." : "Save Hotel"}</button>
        </form>
      )}

      <div className="mt-6 overflow-x-auto border-b border-[var(--color-border)]">
        <div className="flex min-w-max gap-7">{["Overview", "Information", "Amenities", "Photos"].map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`border-b-2 px-1 pb-3 text-sm font-medium ${activeTab === tab ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-transparent text-[var(--color-text-secondary)]"}`}>{tab}</button>)}</div>
      </div>

      {activeTab === "Overview" && <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]"><section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6"><h2 className="font-semibold">About Property</h2><p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{textValue(hotel.description)}</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-xl bg-[var(--color-surface-muted)] p-4"><p className="text-xs text-[var(--color-text-muted)]">Location</p><p className="mt-1 text-sm">{textValue(location)}</p></div><div className="rounded-xl bg-[var(--color-surface-muted)] p-4"><p className="text-xs text-[var(--color-text-muted)]">Address</p><p className="mt-1 text-sm">{textValue(hotel.address)}</p></div></div></section><section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6"><h2 className="font-semibold">Quick Information</h2><div className="mt-5 space-y-4 text-sm"><div className="flex justify-between"><span>Check-in</span><b>Not available</b></div><div className="flex justify-between"><span>Check-out</span><b>Not available</b></div><div className="flex justify-between"><span>Total rooms</span><b>{rooms.length}</b></div><div className="flex justify-between"><span>Guest rating</span><b>{hotel.rating ?? 0}</b></div></div></section></div>}

      {activeTab === "Information" && <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6"><h2 className="font-semibold">Hotel Information</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{[["Name", hotel.name], ["Description", hotel.description], ["Address", hotel.address], ["City", hotel.city], ["Country", hotel.country], ["Status", hotel.status]].map(([label, value]) => <div key={label} className="rounded-xl bg-[var(--color-surface-muted)] p-4"><p className="text-xs text-[var(--color-text-muted)]">{label}</p><p className="mt-1 text-sm">{textValue(value)}</p></div>)}</div></section>}

      {activeTab === "Amenities" && <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Amenities</h2><button type="button" onClick={startEditing} className="text-sm font-medium text-[var(--color-primary)]">Manage amenities</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{amenities.length ? amenities.map((amenity) => <div key={amenity} className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] p-3.5"><CheckCircle2 size={17} className="text-[var(--color-success)]" />{amenity}</div>) : <p className="text-sm text-[var(--color-text-secondary)]">Not available</p>}</div></section>}

      {activeTab === "Photos" && <section className="mt-6 rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Photos</h2><button type="button" onClick={startEditing} className="text-sm font-medium text-[var(--color-primary)]">Manage photos</button></div>{images.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map((photo) => <img key={photo} src={photo} alt={textValue(hotel.name)} className="h-48 w-full rounded-xl object-cover" />)}</div> : <p className="mt-5 text-sm text-[var(--color-text-secondary)]">Not available</p>}</section>}
    </div>
  );
}

export default Hotel;
