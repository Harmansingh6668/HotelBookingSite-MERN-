import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AUTH_DESTINATIONS } from "../../data/authDestinations";
import AuthCard from "./AuthCard";
import DestinationBackground from "./DestinationBackground";
import DestinationSelector from "./DestinationSelector";

function AuthLayout({ children }) {
  const [destinationOrder, setDestinationOrder] = useState(() =>
    shuffleDestinations(AUTH_DESTINATIONS)
  );
  const [activeId, setActiveId] = useState(destinationOrder[0].id);
  const destination =
    AUTH_DESTINATIONS.find((item) => item.id === activeId) || AUTH_DESTINATIONS[0];

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setDestinationOrder((currentOrder) => {
        const currentIndex = currentOrder.findIndex((item) => item.id === activeId);
        const nextIndex = (currentIndex + 1) % currentOrder.length;
        setActiveId(currentOrder[nextIndex].id);
        return currentOrder;
      });
    }, 8000);

    return () => clearInterval(rotationTimer);
  }, [activeId]);

  const handleDestinationSelect = (id) => {
    setActiveId(id);
    setDestinationOrder((currentOrder) => {
      const selected = currentOrder.find((item) => item.id === id);
      const remaining = currentOrder.filter((item) => item.id !== id);
      return selected ? [selected, ...remaining] : currentOrder;
    });
  };

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-[#1F2925]">
      <DestinationBackground destinations={AUTH_DESTINATIONS} activeId={activeId} />

      <header className="relative z-20 flex items-center justify-between px-4 pt-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B4F3A] text-lg font-semibold">
            ਆ
          </span>
          <span className="leading-none">
            <span className="block text-lg font-semibold tracking-tight">Aau Ji</span>
            <span className="text-[10px] tracking-[0.18em] text-white/70">ਆਓ ਜੀ</span>
          </span>
        </Link>

        <Link
          to="/"
          className="rounded-full bg-black/25 px-4 py-2 text-sm font-medium text-white shadow-[0_1px_12px_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-colors hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6C77A]"
        >
          Back to Home
        </Link>
      </header>

      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1440px] flex-col lg:flex-row lg:items-center lg:justify-between lg:px-10 xl:px-16">
        <div className="flex min-h-[38vh] flex-col justify-end px-5 pb-24 pt-10 sm:min-h-[42vh] sm:px-8 lg:min-h-0 lg:w-[52%] lg:justify-center lg:px-0 lg:pb-16 lg:pt-0">
          <div key={destination.id} className="max-w-xl [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] motion-safe:animate-[fadeSlide_700ms_ease]">
            <p className="text-4xl font-semibold tracking-[0.14em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {destination.name}
            </p>
            <p className="mt-3 text-sm font-medium tracking-[0.08em] text-[#E6C77A] sm:text-base">
              {destination.subtitle}
            </p>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/90 italic sm:text-xl">
              “{destination.message}”
            </p>
          </div>
        </div>

        <div className="relative z-30 -mt-20 flex justify-center px-3 pb-8 sm:-mt-24 lg:mt-0 lg:w-[48%] lg:justify-end lg:px-0 lg:py-8">
          <AuthCard>{children}</AuthCard>
        </div>
      </div>

      <div className="relative z-20 px-5 pb-8 sm:px-8 lg:px-10 xl:px-16">
        <DestinationSelector
          destinations={AUTH_DESTINATIONS}
          activeId={activeId}
          onSelect={handleDestinationSelect}
        />
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeSlide {
            from, to { opacity: 1; transform: none; }
          }
        }
      `}</style>
    </div>
  );
}

function shuffleDestinations(destinations) {
  return [...destinations].sort(() => Math.random() - 0.5);
}

export default AuthLayout;
