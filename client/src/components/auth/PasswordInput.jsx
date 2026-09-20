import { useState } from "react";

function PasswordInput({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  required = false,
  disabled = false,
}) {
  const [visible, setVisible] = useState(false);
  const inputId = id || name;
  const errorId = `${inputId}-error`;
  const type = visible ? "text" : "password";

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-[#1F2925]">
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-[12px] border bg-white px-4 py-3 pr-12 text-sm text-[#1F2925] outline-none transition-all duration-200 placeholder:text-[#8A958F] focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10 disabled:cursor-not-allowed disabled:bg-[#F2F5F1] ${
            error ? "border-[#B64A4A]" : "border-[#DDE5DF]"
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute top-1/2 right-2 inline-flex h-9 min-w-9 -translate-y-1/2 items-center justify-center rounded-lg px-2 text-xs font-medium text-[#66736D] transition-colors hover:text-[#0B4F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F3A]"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-[#B64A4A]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default PasswordInput;
