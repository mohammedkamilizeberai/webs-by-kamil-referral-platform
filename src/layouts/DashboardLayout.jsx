import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          WEBS BY <span>KAMIL</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end onClick={() => setSidebarOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/referrals" onClick={() => setSidebarOpen(false)}>
            My Referrals
          </NavLink>
          <NavLink to="/dashboard/profile" onClick={() => setSidebarOpen(false)}>
            Profile
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span className="sidebar-user-name">{user?.fullName}</span>
            <span className="sidebar-user-role">Referrer</span>
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </aside>

      <div className="app-content">
        <div className="topbar">
          <button
            className="hamburger"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
          <span className="topbar-title">Referrer Dashboard</span>
        </div>
        <div className="content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
