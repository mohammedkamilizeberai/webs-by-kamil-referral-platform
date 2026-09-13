import { Link } from "react-router-dom";
import { PACKAGES } from "../../data/mockReferrals";
import { formatNaira } from "../../utils/formatters";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function Packages() {
  return (
    <div className="page-section-only">
      <section className="section page-header">
        <div className="container">
          <span className="section-label">Packages</span>
          <h1>Website Packages For Referred Businesses</h1>
          <p>These are the three packages a referred business can choose from.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="package-grid">
            {PACKAGES.map((pkg) => (
              <Card className="package-card" key={pkg.id}>
                <h3>{pkg.name}</h3>
                <span className="package-price">{formatNaira(pkg.price)}</span>
                <p>Professional website package for small and local businesses.</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt cta-section">
        <div className="container cta-inner">
          <h2>Know A Business That Needs One Of These?</h2>
          <Button as={Link} to="/register" variant="primary" size="lg">
            Become a Referrer
          </Button>
        </div>
      </section>
    </div>
  );
}
