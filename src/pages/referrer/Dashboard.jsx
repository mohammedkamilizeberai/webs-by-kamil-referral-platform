import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useClipboard } from "../../hooks/useClipboard";
import { getReferralsByReferrerId } from "../../services/referrals";
import { buildReferralLink } from "../../utils/referralCode";
import { formatNaira, formatDate } from "../../utils/formatters";
import StatCard from "../../components/StatCard";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Toast from "../../components/Toast";
import EmptyState from "../../components/EmptyState";

// DEMO commission rate — placeholder only, not a real business rule.
// TODO: Once Supabase is connected, commission rules should come from a
// real, server-validated source, not a hardcoded client-side constant.
const DEMO_COMMISSION_RATE = 0.1;

export default function Dashboard() {
  const { user } = useAuth();
  const { copied, copy } = useClipboard();

  const referrals = useMemo(
    () => (user ? getReferralsByReferrerId(user.id) : []),
    [user]
  );

  const referralLink = user ? buildReferralLink(user.referralCode) : "";

  const stats = useMemo(() => {
    const total = referrals.length;
    const pending = referrals.filter((r) => r.status === "Pending").length;
    const completed = referrals.filter((r) => r.status === "Completed");
    const earnings = completed.reduce(
      (sum, r) => sum + r.projectValue * DEMO_COMMISSION_RATE,
      0
    );
    return { total, pending, completedCount: completed.length, earnings };
  }, [referrals]);

  const recent = useMemo(
    () =>
      [...referrals]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5),
    [referrals]
  );

  return (
    <div className="dashboard-page">
      <Toast message={copied ? "Referral link copied!" : ""} onClose={() => {}} />

      <div className="page-heading">
        <h1>Welcome back, {user?.fullName?.split(" ")[0]}</h1>
        <p>Here's an overview of your referral activity.</p>
      </div>

      <Card className="referral-link-card">
        <span className="section-label">Your Referral Link</span>
        <div className="referral-link-row">
          <input readOnly value={referralLink} className="referral-link-input" />
          <Button variant="primary" onClick={() => copy(referralLink)}>
            {copied ? "Copied" : "Copy Link"}
          </Button>
        </div>
        <span className="referral-code-hint">Referral code: {user?.referralCode}</span>
      </Card>

      <div className="stats-grid">
        <StatCard label="Total Referrals" value={stats.total} />
        <StatCard label="Pending Referrals" value={stats.pending} />
        <StatCard label="Successful Referrals" value={stats.completedCount} />
        <StatCard
          label="Estimated Earnings"
          value={formatNaira(stats.earnings)}
          hint={`Demo commission rate: ${DEMO_COMMISSION_RATE * 100}% (placeholder)`}
          accent="highlight"
        />
      </div>

      <div className="dashboard-two-col">
        <Card>
          <div className="card-header-row">
            <h3>Recent Referrals</h3>
            <Link to="/dashboard/referrals">View all</Link>
          </div>
          {recent.length === 0 ? (
            <EmptyState
              title="No referrals yet"
              message="Share your referral link to start tracking referrals here."
            />
          ) : (
            <ul className="recent-list">
              {recent.map((r) => (
                <li key={r.id} className="recent-list-item">
                  <div>
                    <strong>{r.businessName}</strong>
                    <span className="recent-list-meta">
                      {r.package} · {formatDate(r.createdAt)}
                    </span>
                  </div>
                  <Badge>{r.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <Button variant="secondary" onClick={() => copy(referralLink)}>
              Copy Referral Link
            </Button>
            <Button as={Link} to="/dashboard/referrals" variant="secondary">
              View My Referrals
            </Button>
            <Button as={Link} to="/dashboard/profile" variant="secondary">
              Edit Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
