import Card from "./Card";

export default function StatCard({ label, value, hint, accent = "default" }) {
  return (
    <Card className={`stat-card stat-card-${accent}`}>
      <span className="stat-card-label">{label}</span>
      <span className="stat-card-value">{value}</span>
      {hint ? <span className="stat-card-hint">{hint}</span> : null}
    </Card>
  );
}
