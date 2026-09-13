import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">
            WEBS BY <span>KAMIL</span>
          </div>
          <p className="footer-tagline">
            Referral program for Webs By Kamil — connect businesses that need
            a professional website, earn for every referral.
          </p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/become-a-referrer">Become a Referrer</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Webs By Kamil. All Rights Reserved.</span>
        <span>Prototype referral platform — demo data shown throughout.</span>
      </div>
    </footer>
  );
}
