import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const statusStyles = {
  Available: {
    cell: "bg-[#2F7D5A]/10 text-[#2F7D5A] border-[#2F7D5A]/20",
    dot: "bg-[#2F7D5A]",
  },
  Booked: {
    cell: "bg-[#3E7185]/10 text-[#3E7185] border-[#3E7185]/20",
    dot: "bg-[#3E7185]",
  },
  Maintenance: {
    cell: "bg-[#C8922E]/10 text-[#C8922E] border-[#C8922E]/20",
    dot: "bg-[#C8922E]",
  },
  Unavailable: {
    cell: "bg-[#66736D]/10 text-[#66736D] border-[#66736D]/20",
    dot: "bg-[#66736D]",
  },
};

const STATUS_OPTIONS = [
  "Available",
  "Booked",
  "Maintenance",
];

const initialRooms = [
  {
    id: 1,
    number: "101",
    type: "Deluxe",
    availability: [
      "Available",
      "Booked",
      "Available",
      "Available",
      "Maintenance",
      "Available",
      "Available",
    ],
  },
  {
    id: 2,
    number: "102",
    type: "Deluxe",
    availability: [
      "Booked",
      "Booked",
      "Available",
      "Available",
      "Available",
      "Booked",
      "Available",
    ],
  },
  {
    id: 3,
    number: "103",
    type: "Deluxe",
    availability: [
      "Available",
      "Available",
      "Available",
      "Booked",
      "Available",
      "Available",
      "Booked",
    ],
  },
  {
    id: 4,
    number: "201",
    type: "Suite",
    availability: [
      "Available",
      "Available",
      "Booked",
      "Booked",
      "Available",
      "Available",
      "Available",
    ],
  },
  {
    id: 5,
    number: "202",
    type: "Suite",
    availability: [
      "Maintenance",
      "Available",
      "Available",
      "Available",
      "Booked",
      "Booked",
      "Available",
    ],
  },
  {
    id: 6,
    number: "301",
    type: "Premium",
    availability: [
      "Available",
      "Booked",
      "Booked",
      "Available",
      "Available",
      "Maintenance",
      "Available",
    ],
  },
];

function getWeekDates(weekOffset) {
  const today = new Date();

  const monday = new Date(today);

  monday.setDate(
    today.getDate() -
      today.getDay() +
      1 +
      weekOffset * 7
  );

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);

    date.setDate(monday.getDate() + index);

    return date;
  });
}

function formatDate(date) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function getMonthLabel(dates) {
  return dates[0].toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function AvailabilityGrid({
  rooms: backendRooms = [],
  currentWeek = 0,
  roomType = "All",
  status = "All",
  setCurrentWeek,
}) {
  const [rooms, setRooms] = useState(
    backendRooms.length
      ? backendRooms.map((room) => ({
          id: room._id,
          number: String(room.roomNumber ?? 0),
          type: room.roomType || "Not available",
          availability: Array(7).fill(
            ({
              AVAILABLE: "Available",
              BOOKED: "Booked",
              OCCUPIED: "Booked",
              MAINTENANCE: "Maintenance",
            }[String(room.status || "").toUpperCase()]) || "Unavailable"
          ),
        }))
      : initialRooms
  );

  useEffect(() => {
    if (backendRooms.length) {
      setRooms(backendRooms.map((room) => ({
        id: room._id,
        number: String(room.roomNumber ?? 0),
        type: room.roomType || "Not available",
        availability: Array(7).fill(
          ({
            AVAILABLE: "Available",
            BOOKED: "Booked",
            OCCUPIED: "Booked",
            MAINTENANCE: "Maintenance",
          }[String(room.status || "").toUpperCase()]) || "Unavailable"
        ),
      })));
    }
  }, [backendRooms]);

  const [selectedCell, setSelectedCell] = useState(null);

  const dates = useMemo(
    () => getWeekDates(currentWeek),
    [currentWeek]
  );

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesType =
        roomType === "All" ||
        room.type === roomType;

      const matchesStatus =
        status === "All" ||
        room.availability.includes(status);

      return matchesType && matchesStatus;
    });
  }, [rooms, roomType, status]);

  const monthLabel = getMonthLabel(dates);

  const handleCellClick = (room, dateIndex) => {
    setSelectedCell({
      roomId: room.id,
      roomNumber: room.number,
      dateIndex,
      date: dates[dateIndex],
      currentStatus: room.availability[dateIndex],
    });
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedCell) return;

    setRooms((previousRooms) =>
      previousRooms.map((room) => {
        if (room.id !== selectedCell.roomId) {
          return room;
        }

        const updatedAvailability = [
          ...room.availability,
        ];

        updatedAvailability[selectedCell.dateIndex] =
          newStatus;

        return {
          ...room,
          availability: updatedAvailability,
        };
      })
    );

    setSelectedCell(null);
  };

  return (
    <>
      <div className="overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-white">

        {/* Calendar Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4 sm:px-6">

          <button
            type="button"
            onClick={() =>
              setCurrentWeek((previous) => previous - 1)
            }
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--color-border)] text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="text-center">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              {monthLabel}
            </h2>

            <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
              {formatDate(dates[0])} –{" "}
              {formatDate(dates[6])}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setCurrentWeek((previous) => previous + 1)
            }
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--color-border)] text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              No rooms found
            </p>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Try changing your room type or availability
              filter.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <div className="min-w-[900px]">

                {/* Date Header */}
                <div className="grid grid-cols-[180px_repeat(7,minmax(95px,1fr))] border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">

                  <div className="border-r border-[var(--color-border)] px-4 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                    Room
                  </div>

                  {dates.map((date) => (
                    <div
                      key={date.toISOString()}
                      className="border-r border-[var(--color-border)] px-2 py-3 text-center last:border-r-0"
                    >
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {date.toLocaleDateString(
                          "en-IN",
                          {
                            weekday: "short",
                          }
                        )}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                        {date.getDate()}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                        {date.toLocaleDateString(
                          "en-IN",
                          {
                            month: "short",
                          }
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Room Rows */}
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className="grid grid-cols-[180px_repeat(7,minmax(95px,1fr))] border-b border-[var(--color-border)] last:border-b-0"
                  >
                    {/* Room */}
                    <div className="flex flex-col justify-center border-r border-[var(--color-border)] px-4 py-4">
                      <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                        Room {room.number}
                      </span>

                      <span className="mt-1 text-xs text-[var(--color-text-secondary)]">
                        {room.type}
                      </span>
                    </div>

                    {/* Availability */}
                    {room.availability.map(
                      (roomStatus, index) => {
                        const styles =
                          statusStyles[roomStatus];

                        return (
                          <div
                            key={`${room.id}-${index}`}
                            className="border-r border-[var(--color-border)] p-2 last:border-r-0"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                handleCellClick(
                                  room,
                                  index
                                )
                              }
                              className={`flex min-h-[62px] w-full flex-col items-center justify-center rounded-[10px] border text-xs font-medium transition hover:-translate-y-0.5 hover:shadow-sm ${styles.cell}`}
                            >
                              <span
                                className={`mb-1.5 h-2 w-2 rounded-full ${styles.dot}`}
                              />

                              <span>
                                {roomStatus}
                              </span>
                            </button>
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-[var(--color-border)] md:hidden">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4"
                >
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      Room {room.number}
                    </p>

                    <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                      {room.type}
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {dates.map((date, index) => {
                      const roomStatus =
                        room.availability[index];

                      const styles =
                        statusStyles[roomStatus];

                      return (
                        <button
                          key={`${room.id}-${date.toISOString()}`}
                          type="button"
                          onClick={() =>
                            handleCellClick(
                              room,
                              index
                            )
                          }
                          className={`rounded-[10px] border px-2 py-2 text-center transition active:scale-95 ${styles.cell}`}
                        >
                          <p className="text-[10px] opacity-75">
                            {date.toLocaleDateString(
                              "en-IN",
                              {
                                weekday: "short",
                              }
                            )}
                          </p>

                          <p className="text-xs font-semibold">
                            {date.getDate()}
                          </p>

                          <span
                            className={`mx-auto mt-1 block h-1.5 w-1.5 rounded-full ${styles.dot}`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Status Editor */}
      {selectedCell && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 sm:items-center"
          onClick={() => setSelectedCell(null)}
        >
          <div
            className="w-full max-w-md rounded-[20px] bg-white p-5 shadow-xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  Change Availability
                </h3>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  Room {selectedCell.roomNumber} ·{" "}
                  {selectedCell.date.toLocaleDateString(
                    "en-IN",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    }
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCell(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Current Status */}
            <div className="mt-5 rounded-[12px] bg-[var(--color-surface-muted)] p-3">
              <p className="text-xs text-[var(--color-text-secondary)]">
                Current status
              </p>

              <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                {selectedCell.currentStatus}
              </p>
            </div>

            {/* Status Options */}
            <div className="mt-5 space-y-2">
              {STATUS_OPTIONS.map((option) => {
                const styles = statusStyles[option];

                const isSelected =
                  option === selectedCell.currentStatus;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      handleStatusChange(option)
                    }
                    className={`flex w-full items-center gap-3 rounded-[10px] border p-3 text-left transition ${
                      isSelected
                        ? styles.cell
                        : "border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
                    />

                    <span className="flex-1 text-sm font-medium">
                      {option}
                    </span>

                    {isSelected && (
                      <span className="text-xs font-medium">
                        Current
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setSelectedCell(null)}
              className="mt-5 w-full rounded-[10px] border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-muted)]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AvailabilityGrid;