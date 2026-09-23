import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function ProtectedRoute() {
  const { isAuthenticated, user } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (user?.role !== "HOTEL_ADMIN") {
    return <Navigate to="/login" replace />;
  }

  if (!user?.hotelId) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;