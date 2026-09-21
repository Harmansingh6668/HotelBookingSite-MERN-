import { useState } from "react";
import { Pencil, IndianRupee, TrendingUp } from "lucide-react";

const initialPricing = [
  {
    id: 1,
    roomType: "Deluxe",
    rooms: 12,
    basePrice: 3500,
    weekendPrice: 4000,
    status: "ACTIVE",
  },
  {
    id: 2,
    roomType: "Premium",
    rooms: 8,
    basePrice: 5200,
    weekendPrice: 5800,
    status: "ACTIVE",
  },
  {
    id: 3,
    roomType: "Suite",
    rooms: 6,
    basePrice: 6500,
    weekendPrice: 7200,
    status: "ACTIVE",
  },
  {
    id: 4,
    roomType: "Standard",
    rooms: 6,
    basePrice: 2500,
    weekendPrice: 2900,
    status: "ACTIVE",
  },
];

function Pricing() {
  const [pricing, setPricing] = useState(initialPricing);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({
    basePrice: "",
    weekendPrice: "",
  });

  const startEditing = (room) => {
    setEditingId(room.id);

    setEditValues({
      basePrice: room.basePrice,
      weekendPrice: room.weekendPrice,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);

    setEditValues({
      basePrice: "",
      weekendPrice: "",
    });
  };

  const savePricing = (id) => {
    setPricing((currentPricing) =>
      currentPricing.map((room) =>
        room.id === id
          ? {
              ...room,
              basePrice: Number(editValues.basePrice),
              weekendPrice: Number(editValues.weekendPrice),
            }
          : room
      )
    );

    console.log("Updated pricing:", {
      id,
      basePrice: Number(editValues.basePrice),
      weekendPrice: Number(editValues.weekendPrice),
    });

    // PATCH /api/rooms/:id/pricing later

    cancelEditing();
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--color-primary)]">
          PROPERTY
        </p>

        <div className="mt-1">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Pricing
          </h1>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Manage room rates for your hotel.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-muted)]">
          <TrendingUp
            size={20}
            className="text-[var(--color-primary)]"
          />
        </div>

        <div>
          <p className="font-medium">
            Basic room pricing
          </p>

          <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
            Set the standard nightly rate and weekend rate for each room type.
            Advanced seasonal and date-based pricing can be added later.
          </p>
        </div>

      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Room Types
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {pricing.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Total Rooms
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {pricing.reduce((total, room) => total + room.rooms, 0)}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Average Base Rate
          </p>

          <p className="mt-2 flex items-center text-2xl font-semibold">
            <IndianRupee size={20} />
            {Math.round(
              pricing.reduce(
                (total, room) => total + room.basePrice,
                0
              ) / pricing.length
            ).toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      {/* Pricing Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">

        <div className="border-b border-[var(--color-border)] px-6 py-5">
          <h2 className="font-semibold">
            Room Rates
          </h2>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Current rates configured for each room type.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px] text-left">

            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">

              <tr>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Room Type
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Rooms
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Base Price
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Weekend Price
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {pricing.map((room) => {

                const isEditing = editingId === room.id;

                return (
                  <tr
                    key={room.id}
                    className="border-b border-[var(--color-border)] last:border-0"
                  >

                    {/* Room Type */}
                    <td className="px-6 py-5">

                      <p className="font-medium">
                        {room.roomType}
                      </p>

                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        Room category
                      </p>

                    </td>

                    {/* Rooms */}
                    <td className="px-6 py-5 text-sm">
                      {room.rooms}
                    </td>

                    {/* Base Price */}
                    <td className="px-6 py-5">

                      {isEditing ? (
                        <div className="relative w-32">

                          <IndianRupee
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                          />

                          <input
                            type="number"
                            min="0"
                            value={editValues.basePrice}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                basePrice: e.target.value,
                              })
                            }
                            className="w-full rounded-lg border border-[var(--color-border)] py-2 pl-8 pr-2 text-sm outline-none focus:border-[var(--color-primary)]"
                          />

                        </div>
                      ) : (
                        <span className="text-sm font-medium">
                          ₹{room.basePrice.toLocaleString("en-IN")}
                        </span>
                      )}

                    </td>

                    {/* Weekend Price */}
                    <td className="px-6 py-5">

                      {isEditing ? (
                        <div className="relative w-32">

                          <IndianRupee
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                          />

                          <input
                            type="number"
                            min="0"
                            value={editValues.weekendPrice}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                weekendPrice: e.target.value,
                              })
                            }
                            className="w-full rounded-lg border border-[var(--color-border)] py-2 pl-8 pr-2 text-sm outline-none focus:border-[var(--color-primary)]"
                          />

                        </div>
                      ) : (
                        <span className="text-sm font-medium">
                          ₹{room.weekendPrice.toLocaleString("en-IN")}
                        </span>
                      )}

                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[var(--color-success)]">
                        {room.status}
                      </span>

                    </td>

                    {/* Action */}
                    <td className="px-6 py-5">

                      {isEditing ? (
                        <div className="flex items-center gap-2">

                          <button
                            onClick={() => savePricing(room.id)}
                            className="rounded-lg bg-[var(--color-primary)] px-3 py-2 text-xs font-medium text-white hover:bg-[var(--color-primary-dark)]"
                          >
                            Save
                          </button>

                          <button
                            onClick={cancelEditing}
                            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-medium hover:bg-[var(--color-surface-muted)]"
                          >
                            Cancel
                          </button>

                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(room)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>
                      )}

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Pricing;