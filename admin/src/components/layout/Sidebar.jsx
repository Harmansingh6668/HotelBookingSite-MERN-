import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

import {
  LayoutDashboard,
  Building2,
  BedDouble,
  CalendarDays,
  BadgeDollarSign,
  ClipboardList,
  Users,
  Star,
  UserCircle,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const navigation = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
    ],
  },
  {
    title: "PROPERTY",
    items: [
      {
        label: "My Hotel",
        icon: Building2,
        path: "/hotel",
      },
      {
        label: "Rooms",
        icon: BedDouble,
        path: "/rooms",
      },
      {
        label: "Availability",
        icon: CalendarDays,
        path: "/availability",
      },
      {
        label: "Pricing",
        icon: BadgeDollarSign,
        path: "/pricing",
      },
    ],
  },
  {
    title: "RESERVATIONS",
    items: [
      {
        label: "Bookings",
        icon: ClipboardList,
        path: "/bookings",
      },
      {
        label: "Guests",
        icon: Users,
        path: "/guests",
      },
    ],
  },
  {
    title: "REPUTATION",
    items: [
      {
        label: "Reviews",
        icon: Star,
        path: "/reviews",
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        label: "Profile",
        icon: UserCircle,
        path: "/profile",
      },
      {
        label: "Settings",
        icon: Settings,
        path: "/settings",
      },
    ],
  },
];

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col
          border-r border-[var(--color-border)]
          bg-white
          transition-transform duration-300
          lg:static lg:z-auto lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-[76px] items-center justify-between border-b border-[var(--color-border)] px-6">
          <div>
            <div className="text-xl font-semibold text-[var(--color-primary)]">
              ਆਓ ਜੀ
            </div>

            <div className="text-xs font-medium tracking-wide text-[var(--color-text-secondary)]">
              AAU JI · MANAGER
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] lg:hidden"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          {navigation.map((section) => (
            <div key={section.title} className="mb-7">
              <p className="mb-2 px-3 text-[11px] font-semibold tracking-[0.12em] text-[var(--color-text-muted)]">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className="
                        group flex items-center gap-3 rounded-[10px]
                        px-3 py-2.5
                        text-sm font-medium
                        text-[var(--color-text-secondary)]
                        transition
                        hover:bg-[var(--color-surface-muted)]
                        hover:text-[var(--color-primary)]
                      "
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        className="shrink-0"
                      />

                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-[var(--color-border)] p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3 rounded-[10px]
              px-3 py-2.5
              text-sm font-medium
              text-[var(--color-text-secondary)]
              transition
              hover:bg-[var(--color-surface-muted)]
              hover:text-[var(--color-danger)]
            "
          >
            <LogOut size={18} strokeWidth={1.8} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;