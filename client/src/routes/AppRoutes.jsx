import { Routes, Route } from "react-router-dom"
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import HotelDetails from "../pages/HotelDetails";
import Booking from "../pages/Booking";
import Payment from "../pages/Payment";
import BookingConfirmation from "../pages/BookingConfirmation";
import MyBooking from "../pages/MyBooking";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                
                <Route 
                    path="/search" 
                    element={<SearchResults />}
                />

                <Route 
                    path="/hotel/:id"
                    element={<HotelDetails />}
                />

                <Route
                    path="/booking"
                    element={<ProtectedRoute><Booking /></ProtectedRoute>}
                />

                <Route
                    path="/payment"
                    element={<ProtectedRoute><Payment /></ProtectedRoute>}
                />

                <Route
                    path="/booking-confirmation"
                    element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>}
                />

                <Route
                    path="/my-bookings/:bookingId"
                    element={<ProtectedRoute><MyBooking /></ProtectedRoute>}
                />

                <Route 
                    path="destinations"
                    element={<div>destinations</div>}
                />

                <Route 
                    path="offers"
                    element={<div>Offers</div>}
                />
            </Route>

            <Route 
                path="/login"
                element={<Login />}
            />

            <Route 
                path="/register"
                element={<Register />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/verify-otp"
                element={<VerifyOTP />}
            />
        </Routes>
    )
}
export default AppRoutes
