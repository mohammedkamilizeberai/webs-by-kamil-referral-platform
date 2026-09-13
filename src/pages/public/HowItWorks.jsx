import { Link } from "react-router-dom";
import Button from "../../components/Button";

const STEPS = [
  {
    num: "01",
    title: "Register As A Referrer",
    text: "Create a free referrer account with your name, email and phone number.",
  },
  {
    num: "02",
    title: "Get Your Referral Link",
    text: "Every referrer gets a unique referral code and link, visible on your dashboard.",
  },
  {
    num: "03",
    title: "Share It With A Business",
    text: "Send your link to a business owner who needs a professional website.",
  },
  {
    num: "04",
    title: "The Business Becomes A Lead",
    text: "Once they reach out through your link, they're tracked as your referral.",
  },
  {
    num: "05",
    title: "Webs By Kamil Handles The Project",
    text: "From there, Webs By Kamil manages the website project directly with the business.",
  },
  {
    num: "06",
    title: "Track Referral Status",
    text: "Follow your referral's status — Pending, Contacted, In Progress, Completed or Cancelled — from your dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <div className="page-section-only">
      <section className="section page-header">
        <div className="container">
          <span className="section-label">How It Works</span>
          <h1>A Simple, Transparent Referral Process</h1>
          <p>
            No complicated steps — just share your link and track what
            happens next.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
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

      <section className="section section-alt cta-section">
        <div className="container cta-inner">
          <h2>Ready To Get Your Referral Link?</h2>
          <Button as={Link} to="/register" variant="primary" size="lg">
            Become a Referrer
          </Button>
        </div>
      </section>
    </div>
  );
}
