import {
  BarChart3,
  Building2,
  CalendarDays,
  ChevronLeft,
  CircleDollarSign,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  UserCog,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Hotels",
    path: "/hotels",
    icon: Building2,
  },
  {
    label: "Managers",
    path: "/managers",
    icon: UserCog,
  },
  {
    label: "Bookings",
    path: "/bookings",
    icon: CalendarDays,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    label: "Revenue",
    path: "/revenue",
    icon: CircleDollarSign,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
];

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-amber-300">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide text-slate-900">
                AAU JI
              </h1>

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Super Admin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Platform
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? "text-emerald-800"
                            : "text-slate-400 group-hover:text-slate-700"
                        }
                      />

                      <span>{item.label}</span>

                      {isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-700" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <div className="my-6 border-t border-slate-100" />

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            System
          </p>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `
              flex items-center gap-3 rounded-xl px-3 py-3
              text-sm font-medium transition
              ${
                isActive
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }
              `
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Bottom status */}
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-slate-600">
                Platform operational
              </span>
            </div>

            <p className="mt-2 text-[11px] text-slate-400">
              Aau Ji administration
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;