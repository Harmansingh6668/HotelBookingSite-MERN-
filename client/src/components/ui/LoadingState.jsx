function LoadingState({ message = "Loading...", className = "" }) {
  return (
    <div
      className={`flex items-center gap-3 text-[#66736D] ${className}`}
      role="status"
      aria-live="polite"
    >
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-[#DDE5DF] border-t-[#0B4F3A]"
        aria-hidden="true"
      />
      <span>{message}</span>
    </div>
  );
}

export default LoadingState;
