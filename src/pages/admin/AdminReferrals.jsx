import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReferralDirectory } from "../../services/admin";
import { REFERRAL_STATUSES } from "../../data/mockReferrals";
import { formatNaira, formatDate } from "../../utils/formatters";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";

export default function AdminReferrals() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const referrals = useMemo(() => getReferralDirectory(), []);

  const filtered = useMemo(() => {
    let list = referrals;
    if (statusFilter !== "All") {
      list = list.filter((r) => r.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.businessName.toLowerCase().includes(q) ||
          r.referrerName.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [referrals, search, statusFilter]);

  const columns = [
    { key: "referrerName", label: "Referrer" },
    { key: "businessName", label: "Referred Business" },
    { key: "package", label: "Package" },
    {
      key: "projectValue",
      label: "Project Value",
      render: (r) => formatNaira(r.projectValue),
    },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
    { key: "createdAt", label: "Date", render: (r) => formatDate(r.createdAt) },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <h1>Referrals</h1>
        <p>All referrals submitted across the platform. Click a row for details.</p>
      </div>

      <Card>
        <div className="table-toolbar">
          <input
            type="search"
            placeholder="Search by business or referrer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="toolbar-search"
            aria-label="Search referrals"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            {REFERRAL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No referrals found" message="Try adjusting your search or filter." />
        ) : (
          <Table
            columns={columns}
            rows={filtered}
            getRowKey={(r) => r.id}
            onRowClick={(r) => navigate(`/admin/referrals/${r.id}`)}
          />
        )}
      </Card>
    </div>
  );
}
