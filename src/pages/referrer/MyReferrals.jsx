import { useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getReferralsByReferrerId } from "../../services/referrals";
import { REFERRAL_STATUSES } from "../../data/mockReferrals";
import { formatNaira, formatDate } from "../../utils/formatters";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";

const SORT_OPTIONS = [
  { value: "date-desc", label: "Newest first" },
  { value: "date-asc", label: "Oldest first" },
  { value: "value-desc", label: "Highest value first" },
];

export default function MyReferrals() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("date-desc");

  const allReferrals = useMemo(
    () => (user ? getReferralsByReferrerId(user.id) : []),
    [user]
  );

  const filtered = useMemo(() => {
    let list = allReferrals;

    if (statusFilter !== "All") {
      list = list.filter((r) => r.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((r) => r.businessName.toLowerCase().includes(q));
    }

    const sorted = [...list];
    if (sort === "date-desc") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "date-asc") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === "value-desc") {
      sorted.sort((a, b) => b.projectValue - a.projectValue);
    }
    return sorted;
  }, [allReferrals, statusFilter, search, sort]);

  const columns = [
    { key: "businessName", label: "Referred Business" },
    { key: "createdAt", label: "Date", render: (r) => formatDate(r.createdAt) },
    { key: "package", label: "Package" },
    { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
    {
      key: "projectValue",
      label: "Project Value",
      render: (r) => formatNaira(r.projectValue),
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <h1>My Referrals</h1>
        <p>All the businesses you've referred to Webs By Kamil.</p>
      </div>

      <Card>
        <div className="table-toolbar">
          <input
            type="search"
            placeholder="Search by business name..."
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
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort referrals">
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No matching referrals"
            message={
              allReferrals.length === 0
                ? "Share your referral link to start tracking referrals here."
                : "Try adjusting your search or filter."
            }
          />
        ) : (
          <Table columns={columns} rows={filtered} getRowKey={(r) => r.id} />
        )}
      </Card>
    </div>
  );
}
