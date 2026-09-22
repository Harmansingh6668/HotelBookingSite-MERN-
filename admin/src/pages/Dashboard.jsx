import {
  ArrowDownRight,
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  CalendarDays,
  Clock3,
  IndianRupee,
  LogIn,
  LogOut,
  MoreHorizontal,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Bookings",
    value: "24",
    change: "+12.5%",
    positive: true,
    icon: CalendarCheck,
  },
  {
    title: "Revenue",
    value: "₹84,500",
    change: "+8.4%",
    positive: true,
    icon: IndianRupee,
  },
  {
    title: "Occupancy",
    value: "76%",
    change: "+5.2%",
    positive: true,
    icon: BedDouble,
  },
  {
    title: "Available Rooms",
    value: "18 / 32",
    change: "Today",
    positive: null,
    icon: CalendarDays,
  },
];

const checkIns = [
  {
    guest: "Rahul Sharma",
    room: "204",
    guests: 2,
    time: "2:00 PM",
    status: "Confirmed",
  },
  {
    guest: "Aman Singh",
    room: "301",
    guests: 3,
    time: "3:30 PM",
    status: "Confirmed",
  },
  {
    guest: "Simran Kaur",
    room: "105",
    guests: 2,
    time: "5:00 PM",
    status: "Pending",
  },
];

const checkOuts = [
  {
    guest: "Harpreet Singh",
    room: "201",
    guests: 2,
    time: "11:00 AM",
    status: "Ready",
  },
  {
    guest: "Neha Sharma",
    room: "302",
    guests: 2,
    time: "11:30 AM",
    status: "Ready",
  },
];

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-primary)]">
          <Icon size={20} strokeWidth={1.8} />
        </div>

        {stat.positive !== null && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              stat.positive
                ? "text-[var(--color-success)]"
                : "text-[var(--color-danger)]"
            }`}
          >
            {stat.positive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}

            {stat.change}
          </div>
        )}

        {stat.positive === null && (
          <span className="text-xs font-medium text-[var(--color-text-muted)]">
            {stat.change}
          </span>
        )}
      </div>

      <p className="mt-5 text-sm text-[var(--color-text-secondary)]">
        {stat.title}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
        {stat.value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Confirmed:
      "bg-[#EAF5EF] text-[var(--color-success)]",
    Pending:
      "bg-[#FFF6E5] text-[var(--color-warning)]",
    Ready:
      "bg-[#EAF5EF] text-[var(--color-success)]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] || "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
      }`}
    >
      {status}
    </span>
  );
}

function ActivityTable({ title, icon: Icon, data, actionText }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
        <div className="flex items-center gap-2">
          <Icon
            size={18}
            className="text-[var(--color-primary)]"
            strokeWidth={1.8}
          />

          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {title}
          </h2>
        </div>

        <button className="text-xs font-medium text-[var(--color-primary)] hover:underline">
          {actionText}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Guest
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Room
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Guests
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Time
              </th>
              <th className="px-5 py-3 text-left text-xs font-medium text-[var(--color-text-muted)]">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={`${item.guest}-${item.room}`}
                className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-muted)]"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {item.guest}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                  {item.room}
                </td>

                <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                  {item.guests}
                </td>

                <td className="px-5 py-4 text-sm text-[var(--color-text-secondary)]">
                  {item.time}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingChart() {
  const bars = [38, 52, 46, 70, 58, 82, 64];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Booking Overview
          </h2>

          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Booking activity over the last 7 days
          </p>
        </div>

        <select
          defaultValue="7"
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs text-[var(--color-text-secondary)] outline-none focus:border-[var(--color-primary)]"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 3 months</option>
        </select>
      </div>

      <div className="mt-8 flex h-56 items-end gap-3 sm:gap-5">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-lg bg-[var(--color-primary)] opacity-90 transition hover:opacity-100"
                style={{ height: `${height}%` }}
              />
            </div>

            <span className="text-xs text-[var(--color-text-muted)]">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomStatus() {
  const rooms = [
    {
      label: "Available",
      count: 18,
      total: 32,
      color: "bg-[var(--color-success)]",
    },
    {
      label: "Occupied",
      count: 10,
      total: 32,
      color: "bg-[var(--color-primary)]",
    },
    {
      label: "Maintenance",
      count: 2,
      total: 32,
      color: "bg-[var(--color-warning)]",
    },
    {
      label: "Unavailable",
      count: 2,
      total: 32,
      color: "bg-[var(--color-danger)]",
    },
  ];

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
            Room Status
          </h2>

          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Current room inventory
          </p>
        </div>

        <button className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {rooms.map((room) => {
          const percentage = (room.count / room.total) * 100;

          return (
            <div key={room.label}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${room.color}`} />

                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {room.label}
                  </span>
                </div>

                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                  {room.count}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
                <div
                  className={`h-full rounded-full ${room.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-[var(--color-gold)]">
            Monday, 21 September 2026
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
            Good morning, Manager 👋
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Here&apos;s what&apos;s happening at The Grand Amritsar today.
          </p>
        </div>

        <button className="w-fit rounded-[10px] border border-[var(--color-primary)] px-4 py-2.5 text-sm font-medium text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white">
          View Hotel
        </button>
      </div>

      {/* KPI Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Today's Operations */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5EF] text-[var(--color-success)]">
              <LogIn size={19} />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Today&apos;s Check-ins
              </p>

              <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                7
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF4F7] text-[var(--color-info)]">
              <LogOut size={19} />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Today&apos;s Check-outs
              </p>

              <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                4
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF6E5] text-[var(--color-warning)]">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Pending Actions
              </p>

              <p className="mt-1 text-xl font-semibold text-[var(--color-text-primary)]">
                2
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Room Status */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <BookingChart />
        <RoomStatus />
      </div>

      {/* Activity */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ActivityTable
          title="Today's Check-ins"
          icon={LogIn}
          data={checkIns}
          actionText="View all"
        />

        <ActivityTable
          title="Today's Check-outs"
          icon={LogOut}
          data={checkOuts}
          actionText="View all"
        />
      </div>
    </div>
  );
}

export default Dashboard;