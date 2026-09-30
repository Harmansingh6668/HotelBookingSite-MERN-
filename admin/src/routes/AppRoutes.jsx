import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ManagerLayout from "../layouts/ManagerLayout";
import Dashboard from "../pages/Dashboard";
import Hotel from "../pages/Hotel";
import Rooms from "../pages/Rooms";
import RoomDetails from "../pages/RoomDetails";
import AddRoom from "../pages/AddRoom";
import EditRoom from "../pages/EditRoom";
import Availability from "../pages/Availability";
import Bookings from "../pages/Bookings";
import BookingDetails from "../pages/BookingDetails";
import Guests from "../pages/Guests";
import Pricing from "../pages/Pricing";
import Reviews from "../pages/Reviews";
// import Settings from "../pages/Setting";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoutes";
import { API_ERROR_EVENT } from "../services/api/client";
import { HotelProvider } from "../context/HotelContext";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ApiErrorRedirect />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<HotelProvider><Outlet /></HotelProvider>}>
            <Route element={<ManagerLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hotel" element={<Hotel />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<RoomDetails />} />
              <Route path="/rooms/new" element={<AddRoom />} />
              <Route path="/rooms/:id/edit" element={<EditRoom />} />
              <Route path="/availability" element={<Availability />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<BookingDetails />} />
              <Route path="/guests" element={<Guests />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/reviews" element={<Reviews />} />
              {/* <Route path="/settings" element={<Settings />} /> */}
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function ApiErrorRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleApiError = (event) => {
      navigate("/error", {
        replace: true,
        state: { message: event.detail?.message },
      });
    };

    window.addEventListener(API_ERROR_EVENT, handleApiError);
    return () => window.removeEventListener(API_ERROR_EVENT, handleApiError);
  }, [navigate]);

  return null;
}

export default AppRoutes;