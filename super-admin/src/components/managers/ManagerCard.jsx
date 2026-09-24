import {
  Building2,
  ChevronRight,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getStatusClasses(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "PENDING":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "SUSPENDED":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

function ManagerCard({ manager }) {
  const managerId = manager._id || manager.id;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
            {getInitials(manager.name)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {manager.name || "Unnamed Manager"}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              Hotel Administrator
            </p>
          </div>
        </div>

        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
            manager.status
          )}`}
        >
          {manager.status || "UNKNOWN"}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Mail size={16} className="shrink-0 text-slate-400" />
          <span className="truncate">{manager.email || "No email"}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Phone size={16} className="shrink-0 text-slate-400" />
          <span>{manager.phone || "No phone"}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Building2 size={16} className="shrink-0 text-slate-400" />

          <span className="truncate">
            {manager.hotelId
              ? `Hotel ID: ${manager.hotelId}`
              : "No hotel assigned"}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <Link
          to={`/managers/${managerId}`}
          className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <span className="flex items-center gap-2">
            <UserRound size={16} />
            View Manager
          </span>

          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default ManagerCard;