import { Routes, Route } from "react-router-dom"
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import Hotels from "../pages/Hotels";
import HotelDetails from "../pages/HotelDetails";
import Booking from "../pages/Booking";
import Payment from "../pages/Payment";
import BookingConfirmation from "../pages/BookingConfirmation";
import MyBooking from "../pages/MyBooking";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Destinations from "../pages/Destinations";
import InformationPage from "../pages/InformationPage";

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
                    path="/hotels"
                    element={<Hotels />}
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
                    path="/profile"
                    element={<ProtectedRoute><Profile /></ProtectedRoute>}
                />

                <Route 
                    path="destinations"
                    element={<Destinations />}
                />

                <Route 
                    path="offers"
                    element={<div>Offers</div>}
                />
                <Route path="help" element={<InformationPage type="help" />} />
                <Route path="contact" element={<InformationPage type="contact" />} />
                <Route path="cancellation" element={<InformationPage type="cancellation" />} />
                <Route path="privacy" element={<InformationPage type="privacy" />} />
                <Route path="terms" element={<InformationPage type="terms" />} />
            </Route>

            <Route 
                path="/login"
                element={<Login />}
            />

            <Route 
                path="/register"
                element={<Register />}
            />

            {/* <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            /> */}

            {/* <Route
                path="/verify-otp"
                element={<VerifyOTP />}
            /> */}
        </Routes>
    )
}
export default AppRoutes
