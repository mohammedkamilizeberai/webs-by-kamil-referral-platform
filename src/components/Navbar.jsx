import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  function handleLogout() {
    logout();
    close();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="logo" onClick={close}>
          WEBS BY <span>KAMIL</span>
        </NavLink>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>
            Home
          </NavLink>
          <NavLink to="/how-it-works" onClick={close}>
            How It Works
          </NavLink>
          <NavLink to="/packages" onClick={close}>
            Packages
          </NavLink>
          <NavLink to="/become-a-referrer" onClick={close}>
            Become a Referrer
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to={role === "admin" ? "/admin/dashboard" : "/dashboard"}
                onClick={close}
              >
                Dashboard
              </NavLink>
              <button className="nav-cta as-link" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={close}>
                Login
              </NavLink>
              <NavLink to="/register" className="nav-cta" onClick={close}>
                Become a Referrer
              </NavLink>
            </>
          )}
        </nav>

        <button
          className={`hamburger ${open ? "active" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
