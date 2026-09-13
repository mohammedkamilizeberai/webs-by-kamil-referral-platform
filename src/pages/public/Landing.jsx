import { Link } from "react-router-dom";
import { PACKAGES } from "../../data/mockReferrals";
import { formatNaira } from "../../utils/formatters";
import Card from "../../components/Card";
import Button from "../../components/Button";

const STEPS = [
  { num: "01", title: "Register", text: "Sign up as a referrer in a few minutes." },
  { num: "02", title: "Get Your Link", text: "Get a unique referral link tied to your account." },
  { num: "03", title: "Share It", text: "Share your link with a business that needs a website." },
  { num: "04", title: "They Become A Lead", text: "The business is tracked as your referral." },
  { num: "05", title: "We Handle The Project", text: "Webs By Kamil manages the website project directly." },
  { num: "06", title: "Track Progress", text: "Follow the referral's status from your dashboard." },
];

const BENEFITS = [
  { title: "Simple To Start", text: "Register once and get a referral link instantly — no approval wait." },
  { title: "Track Everything", text: "See every referral's status and package from your own dashboard." },
  { title: "No Extra Work", text: "You make the introduction — Webs By Kamil handles the actual project." },
];

const FAQS = [
  {
    q: "Who can become a referrer?",
    a: "Anyone who knows small or local businesses that could use a professional website.",
  },
  {
    q: "What do I need to do as a referrer?",
    a: "Share your referral link with a business owner. Once they get in touch through your link, it's tracked as your referral.",
  },
  {
    q: "How do I know the status of a referral?",
    a: "Your dashboard shows each referral's current status — Pending, Contacted, In Progress, Completed, or Cancelled.",
  },
  {
    q: "Is this program live yet?",
    a: "This is currently a prototype. Commission figures shown anywhere in the app are demo/placeholder values, not final terms.",
  },
];

export default function Landing() {
  return (
    <div className="page-landing">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="section-label">Webs By Kamil Referral Program</span>
            <h1>Earn by Connecting Businesses With Webs By Kamil</h1>
            <p>
              Know a business without a professional website? Refer them to
              Webs By Kamil using your unique referral link, and track every
              referral from your own dashboard.
            </p>
            <div className="hero-actions">
              <Button as={Link} to="/register" variant="primary" size="lg">
                Become a Referrer
              </Button>
              <Button as={Link} to="/login" variant="secondary" size="lg">
                Login
              </Button>
            </div>
          </div>
          <Card className="hero-visual-card">
            <span className="section-label">Prototype Preview</span>
            <p className="hero-visual-text">
              Referrer dashboards, referral tracking, and an admin console —
              all demonstrated with mock data in this prototype.
            </p>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">How It Works</span>
            <h2>From Referral Link To Completed Project</h2>
          </div>
          <div className="process-grid">
            {STEPS.map((step) => (
              <div className="process-step" key={step.num}>
                <span className="process-num">{step.num}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">Packages</span>
            <h2>What Referred Businesses Can Choose From</h2>
          </div>
          <div className="package-grid">
            {PACKAGES.map((pkg) => (
              <Card className="package-card" key={pkg.id}>
                <h3>{pkg.name}</h3>
                <span className="package-price">{formatNaira(pkg.price)}</span>
                <p>Website package for small and local businesses.</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">Why Refer</span>
            <h2>Benefits Of Becoming A Referrer</h2>
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

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-label">FAQ</span>
            <h2>Common Questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-inner">
          <h2>Ready To Start Referring?</h2>
          <p>Register in a few minutes and get your referral link right away.</p>
          <Button as={Link} to="/register" variant="primary" size="lg">
            Become a Referrer
          </Button>
        </div>
      </section>
    </div>
  );
}
