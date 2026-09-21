import { useState } from "react";
import {
  Bell,
  Lock,
  Mail,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

function Settings() {
  const [notifications, setNotifications] = useState({
    newBooking: true,
    cancellation: true,
    review: true,
    email: true,
    sms: false,
  });

  const [saved, setSaved] = useState(false);

  const toggleNotification = (field) => {
    setNotifications((current) => ({
      ...current,
      [field]: !current[field],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    console.log("Updated settings:", notifications);

    // PATCH /api/manager/settings later

    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[var(--color-primary)]">
          ACCOUNT
        </p>

        <h1 className="mt-1 text-2xl font-semibold">
          Settings
        </h1>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Manage notifications, security and account preferences.
        </p>
      </div>

      {/* Notifications */}
      <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">

        <div className="border-b border-[var(--color-border)] p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-muted)]">
              <Bell
                size={19}
                className="text-[var(--color-primary)]"
              />
            </div>

            <div>
              <h2 className="font-semibold">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Choose which hotel events you want to be notified about.
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-[var(--color-border)]">

          <SettingToggle
            title="New bookings"
            description="Get notified whenever a new booking is received."
            checked={notifications.newBooking}
            onChange={() => toggleNotification("newBooking")}
          />

          <SettingToggle
            title="Booking cancellations"
            description="Receive alerts when a guest cancels a booking."
            checked={notifications.cancellation}
            onChange={() => toggleNotification("cancellation")}
          />

          <SettingToggle
            title="New reviews"
            description="Get notified when a guest posts a review."
            checked={notifications.review}
            onChange={() => toggleNotification("review")}
          />

        </div>

      </section>

      {/* Delivery */}
      <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">

        <div className="border-b border-[var(--color-border)] p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-muted)]">
              <Mail
                size={19}
                className="text-[var(--color-primary)]"
              />
            </div>

            <div>
              <h2 className="font-semibold">
                Notification Channels
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Choose how Aau Ji should contact you.
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-[var(--color-border)]">

          <SettingToggle
            icon={<Mail size={18} />}
            title="Email notifications"
            description="Receive important hotel updates by email."
            checked={notifications.email}
            onChange={() => toggleNotification("email")}
          />

          <SettingToggle
            icon={<Smartphone size={18} />}
            title="SMS notifications"
            description="Receive important alerts through SMS."
            checked={notifications.sms}
            onChange={() => toggleNotification("sms")}
          />

        </div>

      </section>

      {/* Security */}
      <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">

        <div className="border-b border-[var(--color-border)] p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-muted)]">
              <ShieldCheck
                size={19}
                className="text-[var(--color-primary)]"
              />
            </div>

            <div>
              <h2 className="font-semibold">
                Security
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Manage your manager account security.
              </p>
            </div>

          </div>

        </div>

        <div className="p-5 sm:p-6">

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-muted)]"
          >
            <Lock size={17} />
            Change Password
          </button>

          <p className="mt-3 text-xs text-[var(--color-text-muted)]">
            Password management will be connected to the authentication backend later.
          </p>

        </div>

      </section>

      {/* Save */}
      <div className="flex flex-wrap items-center gap-3">

        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
        >
          Save Settings
        </button>

        {saved && (
          <span className="text-sm font-medium text-[var(--color-success)]">
            Settings saved successfully.
          </span>
        )}

      </div>

    </div>
  );
}

function SettingToggle({
  icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-5 sm:p-6">

      <div className="flex min-w-0 items-start gap-3">

        {icon && (
          <div className="mt-0.5 text-[var(--color-text-secondary)]">
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm font-medium">
            {title}
          </p>

          <p className="mt-1 text-sm leading-5 text-[var(--color-text-secondary)]">
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-[var(--color-primary)]"
            : "bg-[var(--color-border)]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}

export default Settings;