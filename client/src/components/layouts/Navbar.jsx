import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { logout } from "../../services/auth/authService";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/", { replace: true });
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Hotels",
      path: "/search",
    },
    {
      name: "Destinations",
      path: "/destinations",
    },
    {
      name: "Offers",
      path: "/offers",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#DDE5DF] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B4F3A] text-lg font-semibold text-white">
            ਆ
          </div>

          <div className="leading-none">
            <span className="block text-lg font-semibold tracking-tight text-[#0B4F3A]">
              Aau Ji
            </span>

            <span className="text-[10px] tracking-[0.18em] text-[#66736D]">
              ਆਓ ਜੀ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative py-2 text-sm font-medium text-[#1F2925] transition-colors duration-200 hover:text-[#0B4F3A]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="max-w-32 truncate text-sm text-[#66736D]">
                {user?.firstName || user?.email || "Account"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-[10px] border border-[#0B4F3A] px-4 py-2.5 text-sm font-medium text-[#0B4F3A]"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-[#0B4F3A] transition-colors hover:text-[#083D2D]"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-[10px] bg-[#0B4F3A] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#083D2D]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[#0B4F3A] transition-colors hover:bg-[#F2F5F1] md:hidden"
        >
          <span className="text-2xl leading-none">
            {isMenuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-[#DDE5DF] bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-[#DDE5DF] py-3 text-sm font-medium text-[#1F2925] last:border-b-0 hover:text-[#0B4F3A]"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-4 flex gap-3">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 rounded-[10px] border border-[#0B4F3A] px-4 py-2.5 text-center text-sm font-medium text-[#0B4F3A]"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 rounded-[10px] border border-[#0B4F3A] px-4 py-2.5 text-center text-sm font-medium text-[#0B4F3A]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 rounded-[10px] bg-[#0B4F3A] px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;