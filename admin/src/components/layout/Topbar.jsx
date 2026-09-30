import { Bell, Menu, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearAdminSession } from "../../services/api/storage";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useHotel } from "../../context/HotelContext";
import { useState } from "react";

function Topbar({ onMenuClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAdminAuth();
  const { hotel, loading: hotelLoading } = useHotel();
  const managerName = user?.name || user?.email || "Hotel Manager";
  const hotelName = hotel?.name || (hotelLoading ? "Loading hotel..." : "Hotel unavailable");
  const managerInitial = managerName.trim().charAt(0).toUpperCase() || "M";

  const handleLogout = () => {
    clearAdminSession();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-[76px] items-center justify-between border-b border-[var(--color-border)] bg-white px-4 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            {hotelName}
          </p>

          <p className="hidden text-xs text-[var(--color-text-muted)] sm:block">
            Hotel Manager
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <button
          type="button"
          className="
            relative rounded-full p-2.5
            text-[var(--color-text-secondary)]
            transition
            hover:bg-[var(--color-surface-muted)]
            hover:text-[var(--color-primary)]
          "
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.8} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-danger)]" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="
              flex items-center gap-2 rounded-[10px]
              px-2 py-1.5
              transition
              hover:bg-[var(--color-surface-muted)]
            "
            aria-expanded={isProfileOpen}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-white">
              {managerInitial}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {managerName}
              </p>

              <p className="text-xs text-[var(--color-text-muted)]">
                {user?.role === "HOTEL_ADMIN" ? "Hotel Manager" : user?.role || "Hotel Manager"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-[var(--color-text-muted)] transition-transform sm:block ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        {/* Dropdown */}
          {isProfileOpen && (
            <div
              className="
                absolute right-0 top-full z-50 mt-2
                w-52 overflow-hidden
                rounded-xl border border-[var(--color-border)]
                bg-white
                shadow-lg
              "
            >
              {/* Profile */}
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/profile");
                }}
                className="
                  flex w-full items-center gap-3
                  px-4 py-3
                  text-sm text-[var(--color-text-primary)]
                  transition
                  hover:bg-[var(--color-surface-muted)]
                "
              >
                <User size={17} />
                <span>Profile</span>
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/settings");
                }}
                className="
                  flex w-full items-center gap-3
                  px-4 py-3
                  text-sm text-[var(--color-text-primary)]
                  transition
                  hover:bg-[var(--color-surface-muted)]
                "
              >
                <Settings size={17} />
                <span>Settings</span>
              </button>

              <div className="border-t border-[var(--color-border)]" />

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex w-full items-center gap-3
                  px-4 py-3
                  text-sm text-red-600
                  transition
                  hover:bg-red-50
                "
              >
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;