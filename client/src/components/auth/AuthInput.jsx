function AuthInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  required = false,
  disabled = false,
}) {
  const inputId = id || name;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-[#1F2925]">
        {label}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
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
        className={`w-full rounded-[12px] border bg-white px-4 py-3 text-sm text-[#1F2925] outline-none transition-all duration-200 placeholder:text-[#8A958F] focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10 disabled:cursor-not-allowed disabled:bg-[#F2F5F1] ${
          error ? "border-[#B64A4A]" : "border-[#DDE5DF]"
        }`}
      />
      {error ? (
        <p id={errorId} className="text-xs text-[#B64A4A]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default AuthInput;
