import { useMemo, useRef } from "react";

function OTPInput({ value, onChange, error, disabled = false }) {
  const digits = useMemo(() => {
    const next = (value || "").replace(/\D/g, "").slice(0, 6).split("");
    return Array.from({ length: 6 }, (_, index) => next[index] || "");
  }, [value]);

  const inputsRef = useRef([]);

  const emit = (nextDigits) => {
    onChange(nextDigits.join(""));
  };

  const focusIndex = (index) => {
    const node = inputsRef.current[index];
    if (node) node.focus();
  };

  const handleChange = (index, raw) => {
    const cleaned = raw.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      emit(next);
      return;
    }

    const chars = cleaned.split("");
    const next = [...digits];
    chars.forEach((char, offset) => {
      if (index + offset < 6) {
        next[index + offset] = char;
      }
    });
    emit(next);
    focusIndex(Math.min(index + chars.length, 5));
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      emit(next);
      focusIndex(index - 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusIndex(Math.max(index - 1, 0));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusIndex(Math.min(index + 1, 5));
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = Array.from({ length: 6 }, (_, index) => pasted[index] || "");
    emit(next);
    focusIndex(Math.min(pasted.length, 5));
  };

  return (
    <div>
      <p id="otp-label" className="mb-2 text-sm font-medium text-[#1F2925]">
        Verification code
      </p>
      <div
        className="flex justify-between gap-2"
        role="group"
        aria-labelledby="otp-label"
        aria-describedby={error ? "otp-error" : undefined}
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              inputsRef.current[index] = node;
            }}
            value={digit}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of 6`}
            className={`h-12 w-11 rounded-[12px] border bg-white text-center text-lg text-[#1F2925] outline-none transition-all duration-200 focus:border-[#0B4F3A] focus:ring-4 focus:ring-[#0B4F3A]/10 disabled:bg-[#F2F5F1] sm:h-13 sm:w-12 ${
              error ? "border-[#B64A4A]" : "border-[#DDE5DF]"
            }`}
          />
        ))}
      </div>
      {error ? (
        <p id="otp-error" className="mt-2 text-xs text-[#B64A4A]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default OTPInput;
