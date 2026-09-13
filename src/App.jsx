import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Landing from "./pages/public/Landing";
import HowItWorks from "./pages/public/HowItWorks";
import Packages from "./pages/public/Packages";
import BecomeReferrer from "./pages/public/BecomeReferrer";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import Dashboard from "./pages/referrer/Dashboard";
import MyReferrals from "./pages/referrer/MyReferrals";
import Profile from "./pages/referrer/Profile";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReferrers from "./pages/admin/AdminReferrers";
import AdminReferrals from "./pages/admin/AdminReferrals";
import AdminReferralDetails from "./pages/admin/AdminReferralDetails";

function NotFound() {
  return (
    <div className="container" style={{ padding: "160px 0", textAlign: "center" }}>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/become-a-referrer" element={<BecomeReferrer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Referrer dashboard (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="referrals" element={<MyReferrals />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin dashboard (protected) */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="referrers" element={<AdminReferrers />} />
          <Route path="referrals" element={<AdminReferrals />} />
          <Route path="referrals/:id" element={<AdminReferralDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
