import { useMemo } from "react";
import { getOverviewStats, getRecentActivity } from "../../services/admin";
import { formatNaira, timeAgo } from "../../utils/formatters";
import StatCard from "../../components/StatCard";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";

export default function AdminDashboard() {
  const stats = useMemo(() => getOverviewStats(), []);
  const recent = useMemo(() => getRecentActivity(6), []);

  const maxCount = Math.max(1, ...stats.statusBreakdown.map((s) => s.count));

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <h1>Overview</h1>
        <p>A snapshot of referral activity across the whole platform.</p>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Referrers" value={stats.totalReferrers} />
        <StatCard label="Total Referrals" value={stats.totalReferrals} />
        <StatCard label="Pending Referrals" value={stats.pendingReferrals} />
        <StatCard label="Completed Referrals" value={stats.completedReferrals} />
        <StatCard
          label="Total Project Value"
          value={formatNaira(stats.totalProjectValue)}
          hint="Sum of all referred project packages"
          accent="highlight"
        />
      </div>

      <div className="dashboard-two-col">
        <Card>
          <h3>Referral Status Breakdown</h3>
          <div className="bar-chart">
            {stats.statusBreakdown.map((s) => (
              <div className="bar-chart-row" key={s.status}>
                <span className="bar-chart-label">{s.status}</span>
                <div className="bar-chart-track">
                  <div
                    className="bar-chart-fill"
                    style={{ width: `${(s.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="bar-chart-value">{s.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3>Recent Activity</h3>
          {recent.length === 0 ? (
            <EmptyState title="No activity yet" />
          ) : (
            <ul className="recent-list">
              {recent.map((r) => (
                <li key={r.id} className="recent-list-item">
                  <div>
                    <strong>{r.businessName}</strong>
                    <span className="recent-list-meta">
                      Referred by {r.referrerName} · {timeAgo(r.createdAt)}
                    </span>
                  </div>
                  <Badge>{r.status}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
