import { useEffect } from "react";

export default function MissingFieldsModal({
  isOpen,
  onClose,
  missingFields = [],
  title = "Incomplete Details",
  description = "Please fill in all mandatory fields before proceeding with your booking.",
}) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md rounded-[16px] border border-[#DDE5DF] bg-white p-6 shadow-xl transition-all">
        {/* Header Icon + Title */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <svg
              className="h-5 w-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1F2925]">{title}</h3>
            <p className="mt-1 text-sm text-[#66736D]">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-[#8A958F] transition hover:bg-gray-100 hover:text-[#1F2925]"
          >
            ✕
          </button>
        </div>

        {/* Missing Fields List */}
        {missingFields.length > 0 && (
          <div className="mt-4 rounded-[10px] bg-neutral-50 p-3 border border-[#DDE5DF]">
            <p className="text-xs font-semibold text-[#8A958F] uppercase tracking-wider">
              Required items to complete:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[#1F2925]">
              {missingFields.map((field, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600 shrink-0" />
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-[10px] bg-[#0B4F3A] py-2.5 px-4 text-sm font-medium text-white transition hover:bg-[#083D2D]"
          >
            Got it, let me fix it
          </button>
        </div>
      </div>
    </div>
  );
}