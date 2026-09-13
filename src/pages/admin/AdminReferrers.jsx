import { useMemo, useState } from "react";
import { getReferrerDirectory } from "../../services/admin";
import { formatDate } from "../../utils/formatters";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";

export default function AdminReferrers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const referrers = useMemo(() => getReferrerDirectory(), []);

  const filtered = useMemo(() => {
    let list = referrers;
    if (statusFilter !== "All") {
      list = list.filter((r) => r.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.fullName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.referralCode.toLowerCase().includes(q)
      );
    }
    return list;
  }, [referrers, search, statusFilter]);

  const columns = [
    { key: "fullName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "referralCode", label: "Referral Code" },
    { key: "totalReferrals", label: "Total Referrals" },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
    { key: "createdAt", label: "Date Joined", render: (r) => formatDate(r.createdAt) },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <h1>Referrers</h1>
        <p>All registered referrers on the platform.</p>
      </div>

      <Card>
        <div className="table-toolbar">
          <input
            type="search"
            placeholder="Search by name, email or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="toolbar-search"
            aria-label="Search referrers"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="New">New</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No referrers found" message="Try adjusting your search or filter." />
        ) : (
          <Table columns={columns} rows={filtered} getRowKey={(r) => r.id} />
        )}
      </Card>
    </div>
  );
}
