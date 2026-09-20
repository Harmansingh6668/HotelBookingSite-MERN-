import { useEffect, useState } from "react";

function AuthCard({ children }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className={`w-full max-w-none rounded-[24px] bg-[#FAF8F2] px-5 py-6 shadow-[0_24px_60px_rgba(8,61,45,0.18)] motion-safe:transition-all motion-safe:duration-700 sm:max-w-[440px] sm:px-9 sm:py-10 lg:w-[440px] lg:max-w-[460px] ${
        entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="mb-6 text-center">
        <p className="text-[22px] leading-none text-[#0B4F3A]">ਆਓ ਜੀ</p>
        <p className="mt-2 text-[11px] font-medium tracking-[0.22em] text-[#8A958F] uppercase">
          Welcome
        </p>
      </div>
      {children}
    </section>
  );
}

export default AuthCard;
