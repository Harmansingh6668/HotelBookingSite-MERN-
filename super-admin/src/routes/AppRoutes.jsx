import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Unauthorized from "../pages/auth/Unauthorized";
import Dashboard from "../pages/dashboard/Dashboard";

import DashboardLayout from "../components/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import Hotels from "../pages/hotels/Hotels";
import HotelDetails from "../pages/hotels/HotelDetails";

import ManagerDetails from "../pages/managers/ManagerDetails";
import Managers from "../pages/managers/Managers";

import Customers from "../pages/customers/Customers";
import CustomerDetails from "../pages/customers/CustomerDetails";

import Settings from "../pages/settings/Settings";
function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* Super Admin */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* These pages will be implemented next */}
          <Route
            path="/hotels"
            element={
              <Hotels />
            }
          />

          <Route
            path="/hotels/:id"
            element={
              <HotelDetails />
            }
          />

          <Route
            path="/managers"
            element={
              <Managers title="Managers" />
            }
          />
          <Route
            path="/managers/:id"
            element={
              <ManagerDetails />
            }
          />

          <Route
            path="/bookings"
            element={
              <PlaceholderPage title="Bookings" />
            }
          />

          <Route
            path="/customers"
            element={
              <Customers title="Customers" />
            }
          />
          <Route
            path="/customers/:id"
            element={
              <CustomerDetails title="Customers" />
            }
          />

          <Route
            path="/revenue"
            element={
              <PlaceholderPage title="Revenue" />
            }
          />

          <Route
            path="/analytics"
            element={
              <PlaceholderPage title="Analytics" />
            }
          />

          <Route
            path="/settings"
            element={
              <Settings />
            }
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="p-6 lg:p-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <p className="text-sm text-emerald-800">
          Super Admin
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          This module will be implemented in the next phase.
        </p>
      </div>
    </div>
  );
}

export default AppRoutes;