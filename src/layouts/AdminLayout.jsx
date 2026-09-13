import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar sidebar-admin ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          WEBS BY <span>KAMIL</span>
          <span className="sidebar-admin-tag">Admin</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" end onClick={() => setSidebarOpen(false)}>
            Overview
          </NavLink>
          <NavLink to="/admin/referrers" onClick={() => setSidebarOpen(false)}>
            Referrers
          </NavLink>
          <NavLink to="/admin/referrals" onClick={() => setSidebarOpen(false)}>
            Referrals
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span className="sidebar-user-name">{user?.fullName}</span>
            <span className="sidebar-user-role">Administrator</span>
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
          <span className="topbar-title">Admin Dashboard</span>
        </div>
        <div className="content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
