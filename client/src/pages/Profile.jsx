import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import LoadingState from "../components/ui/LoadingState";
import { useAuth } from "../context/useAuth";
import { logout } from "../services/auth/authService";
import { getMyBookings } from "../services/api/booking";

function formatDate(value) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data.bookings || []);
      } catch (error) {
        setBookingError(error.message || "Unable to load booking history.");
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, []);

  const nextBooking = useMemo(
    () =>
      bookings
        .filter((booking) => booking.status !== "CANCELLED")
        .sort(
          (a, b) =>
            new Date(a.checkInDate).getTime() -
            new Date(b.checkInDate).getTime()
        )[0],
    [bookings]
  );

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#FAF8F2] py-10 sm:py-14">
      <Container>
        <section className="rounded-[18px] bg-[#0B4F3A] p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-[#E6C77A]">
                Profile
              </p>
              <h1 className="mt-2 text-3xl font-semibold">
                Welcome, {user?.firstName || user?.name || "traveller"}
              </h1>
              <p className="mt-2 text-sm text-white/75">
                {user?.email || "Your account is active"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-[10px] border border-white/50 px-4 py-2.5 text-sm font-medium hover:bg-white/10"
            >
              Log out
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[12px] bg-white/10 p-4">
              <p className="text-2xl font-semibold">{bookings.length}</p>
              <p className="mt-1 text-xs text-white/70">Total bookings</p>
            </div>
            <div className="rounded-[12px] bg-white/10 p-4">
              <p className="text-2xl font-semibold">
                {bookings.filter((booking) => booking.status === "COMPLETED").length}
              </p>
              <p className="mt-1 text-xs text-white/70">Completed stays</p>
            </div>
            <div className="rounded-[12px] bg-white/10 p-4">
              <p className="text-2xl font-semibold">
                {bookings.filter((booking) => booking.status === "CANCELLED").length}
              </p>
              <p className="mt-1 text-xs text-white/70">Cancelled bookings</p>
            </div>
          </div>
        </section>

        {loadingBookings && (
          <LoadingState className="mt-8 text-sm" message="Loading your stays..." />
        )}
        {bookingError && <p className="mt-8 text-sm text-red-600">{bookingError}</p>}

        {!loadingBookings && !bookingError && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-[#1F2925]">Next stay</h2>
                <Link to="/hotels" className="text-sm font-medium text-[#0B4F3A]">
                  Explore hotels
                </Link>
              </div>
              {nextBooking ? (
                <div className="mt-5 rounded-[12px] bg-[#F2F5F1] p-5">
                  <p className="font-semibold text-[#1F2925]">
                    {nextBooking.hotelId?.name || "Hotel stay"}
                  </p>
                  <p className="mt-2 text-sm text-[#66736D]">
                    {formatDate(nextBooking.checkInDate)} →{" "}
                    {formatDate(nextBooking.checkOutDate)}
                  </p>
                  <p className="mt-2 text-sm text-[#66736D]">
                    {nextBooking.guests} guest{nextBooking.guests === 1 ? "" : "s"} ·{" "}
                    {nextBooking.status}
                  </p>
                </div>
              ) : (
                <p className="mt-5 text-sm text-[#66736D]">
                  You do not have an upcoming stay yet.
                </p>
              )}
            </section>

            <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6">
              <h2 className="text-xl font-semibold text-[#1F2925]">Account</h2>
              <div className="mt-5 space-y-3 text-sm text-[#66736D]">
                <p><span className="font-semibold text-[#1F2925]">Name:</span> {user?.name || user?.firstName || "Not available"}</p>
                <p><span className="font-semibold text-[#1F2925]">Email:</span> {user?.email || "Not available"}</p>
                <p><span className="font-semibold text-[#1F2925]">Phone:</span> {user?.phone || "Not available"}</p>
              </div>
            </section>

            <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-[#1F2925]">Travel history</h2>
              {bookings.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="flex flex-wrap justify-between gap-3 border-b border-[#DDE5DF] pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-[#1F2925]">
                          {booking.hotelId?.name || "Hotel stay"}
                        </p>
                        <p className="mt-1 text-sm text-[#66736D]">
                          {formatDate(booking.checkInDate)} → {formatDate(booking.checkOutDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-[#0B4F3A]">{booking.status}</span>
                        <Link
                          to={`/my-bookings/${booking._id}`}
                          className="text-sm font-medium text-[#0B4F3A] hover:text-[#083D2D]"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-[#66736D]">Your travel history will appear here.</p>
              )}
            </section>

            <section className="rounded-[16px] border border-[#DDE5DF] bg-white p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-[#1F2925]">Saved hotels</h2>
              <p className="mt-3 text-sm text-[#66736D]">
                Saved hotels and recently viewed stays will appear here.
              </p>
            </section>
          </div>
        )}
      </Container>
    </main>
  );
}

export default Profile;
