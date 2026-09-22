import { Bell, Menu, ChevronDown } from "lucide-react";

function Topbar({ onMenuClick }) {
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
            The Grand Amritsar
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
        <button
          type="button"
          className="
            flex items-center gap-2 rounded-[10px]
            px-2 py-1.5
            transition
            hover:bg-[var(--color-surface-muted)]
          "
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-white">
            M
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              Manager
            </p>

            <p className="text-xs text-[var(--color-text-muted)]">
              Hotel Manager
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-[var(--color-text-muted)] sm:block"
          />
        </button>
      </div>
    </header>
  );
}

export default Topbar;