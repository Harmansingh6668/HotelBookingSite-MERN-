import {
  CheckCircle2,
  ChevronRight,
  Mail,
  Phone,
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

function statusClasses(status) {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "SUSPENDED":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

function CustomerCard({ customer }) {
  const id = customer._id || customer.id;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            {getInitials(customer.name)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {customer.name || "Unnamed Customer"}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Customer
            </p>
          </div>
        </div>

        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(
            customer.status
          )}`}
        >
          {customer.status || "UNKNOWN"}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Mail size={16} className="shrink-0 text-slate-400" />
          <span className="truncate">
            {customer.email || "No email"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Phone size={16} className="shrink-0 text-slate-400" />
          <span>
            {customer.phone || "No phone"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <CheckCircle2
            size={16}
            className="shrink-0 text-slate-400"
          />

          <span>
            {customer.emailVerified
              ? "Email verified"
              : "Email not verified"}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <Link
          to={`/customers/${id}`}
          className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <span className="flex items-center gap-2">
            <UserRound size={16} />
            View Customer
          </span>

          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default CustomerCard;