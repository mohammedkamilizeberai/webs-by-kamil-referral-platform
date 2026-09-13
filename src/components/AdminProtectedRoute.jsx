import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// PROTOTYPE NOTE: this check happens entirely client-side, which is only
// acceptable for a local prototype.
// TODO: Once Supabase is connected, admin authorization must ALSO be
// enforced server-side (e.g. Row Level Security policies keyed on a
// `role` column, or a dedicated admin check in Supabase Edge Functions).
// Client-side route guarding alone is never sufficient for real admin data.
export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
