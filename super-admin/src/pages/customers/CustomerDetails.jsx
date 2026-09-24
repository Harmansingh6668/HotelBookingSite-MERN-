import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  Shield,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useCustomer } from "../../hooks/useCustomers";

function CustomerDetails() {
  const { id } = useParams();

  const {
    customer,
    loading,
    error,
  } = useCustomer(id);

  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-7 w-40 rounded bg-slate-200" />
        <div className="h-72 rounded-2xl bg-white" />
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="space-y-5">
        <Link
          to="/customers"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500"
        >
          <ArrowLeft size={16} />
          Back to Customers
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">
            Customer not found
          </h2>

          <p className="mt-1 text-sm text-red-700">
            {error || "Unable to load customer information."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/customers"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Customers
        </Link>

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
            {customer.name
              ?.split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {customer.name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Customer Account
            </p>
          </div>

          <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 md:ml-auto">
            {customer.status}
          </span>
        </div>
      </div>

      {/* Profile */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <UserRound
            size={19}
            className="text-slate-500"
          />

          <h2 className="font-semibold text-slate-900">
            Customer Information
          </h2>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <InfoItem
            icon={<UserRound size={17} />}
            label="Full Name"
            value={customer.name}
          />

          <InfoItem
            icon={<Mail size={17} />}
            label="Email"
            value={customer.email}
          />

          <InfoItem
            icon={<Phone size={17} />}
            label="Phone"
            value={customer.phone}
          />

          <InfoItem
            icon={<Shield size={17} />}
            label="Role"
            value={customer.role}
          />

          <InfoItem
            icon={<CheckCircle2 size={17} />}
            label="Email Verification"
            value={
              customer.emailVerified
                ? "Verified"
                : "Not verified"
            }
          />

          <InfoItem
            icon={<Shield size={17} />}
            label="Account Status"
            value={customer.status}
          />

          <InfoItem
            icon={<UserRound size={17} />}
            label="Customer ID"
            value={customer._id || customer.id}
          />

          <InfoItem
            icon={<CalendarDays size={17} />}
            label="Joined"
            value={formatDate(customer.createdAt)}
          />
        </div>
      </section>

      {/* Future booking section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">
          Booking Activity
        </h2>

        <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <CalendarDays
            size={28}
            className="mx-auto text-slate-400"
          />

          <p className="mt-3 text-sm font-semibold text-slate-700">
            Booking history will appear here
          </p>

          <p className="mt-1 text-xs text-slate-500">
            We will connect this section when the Super Admin
            booking API is implemented.
          </p>
        </div>
      </section>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        {icon}
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-medium text-slate-800">
        {value || "Not available"}
      </p>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default CustomerDetails;