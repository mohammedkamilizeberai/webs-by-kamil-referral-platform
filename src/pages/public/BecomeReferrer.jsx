import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Button from "../../components/Button";

const BENEFITS = [
  { title: "Simple To Start", text: "Register once and get a referral link instantly." },
  { title: "Track Everything", text: "See every referral's status and package from your dashboard." },
  { title: "No Extra Work For You", text: "You make the introduction — Webs By Kamil handles the project." },
  { title: "Refer As Many As You Like", text: "There's no limit on how many businesses you can refer." },
];

export default function BecomeReferrer() {
  return (
    <div className="page-section-only">
      <section className="section page-header">
        <div className="container">
          <span className="section-label">Become a Referrer</span>
          <h1>Turn Your Connections Into Website Projects</h1>
          <p>
            If you know small or local businesses that need a professional
            website, you can refer them to Webs By Kamil and track every
            referral yourself.
          </p>
          <Button as={Link} to="/register" variant="primary" size="lg">
            Register As A Referrer
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">Why Refer</span>
            <h2>What You Get As A Referrer</h2>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map((b) => (
              <Card className="benefit-card" key={b.title}>
                <h4>{b.title}</h4>
                <p>{b.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt cta-section">
        <div className="container cta-inner">
          <h2>Ready To Get Started?</h2>
          <p>It only takes a few minutes to register and get your referral link.</p>
          <Button as={Link} to="/register" variant="primary" size="lg">
            Become a Referrer
          </Button>
        </div>
      </section>
    </div>
  );
}
