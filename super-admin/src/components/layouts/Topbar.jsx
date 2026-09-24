import {
  Bell,
  ChevronDown,
  Menu,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const displayName =
    user?.name || user?.email?.split("@")[0] || "Super Admin";

  const email = user?.email || "Administrator";

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Platform Administration
            </p>

            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              Aau Ji Management
            </h2>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setProfileOpen((current) => !current)
              }
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold text-amber-300">
                {displayName.charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left md:block">
                <p className="max-w-32 truncate text-sm font-semibold text-slate-800">
                  {displayName}
                </p>

                <p className="text-[11px] text-slate-400">
                  Super Admin
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden text-slate-400 md:block"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                <div className="border-b border-slate-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold text-amber-300">
                      {displayName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {displayName}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <ShieldCheck size={17} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;