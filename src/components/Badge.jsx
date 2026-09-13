const STATUS_TONE = {
  Pending: "tone-neutral",
  Contacted: "tone-info",
  "In Progress": "tone-warning",
  Completed: "tone-success",
  Cancelled: "tone-danger",
  Active: "tone-success",
  New: "tone-info",
};

export default function Badge({ children, tone }) {
  const resolvedTone = tone || STATUS_TONE[children] || "tone-neutral";
  return <span className={`badge ${resolvedTone}`}>{children}</span>;
}
