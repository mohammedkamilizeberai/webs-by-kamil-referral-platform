import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getReferralById, updateReferralStatus } from "../../services/referrals";
import { getUserById } from "../../services/users";
import { REFERRAL_STATUSES } from "../../data/mockReferrals";
import { formatNaira, formatDate } from "../../utils/formatters";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import ConfirmDialog from "../../components/ConfirmDialog";
import Toast from "../../components/Toast";
import EmptyState from "../../components/EmptyState";

// DEMO commission rate — same placeholder used on the referrer dashboard.
const DEMO_COMMISSION_RATE = 0.1;

export default function AdminReferralDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [referral, setReferral] = useState(() => getReferralById(id));
  const referrer = useMemo(
    () => (referral ? getUserById(referral.referrerId) : null),
    [referral]
  );

  const [pendingStatus, setPendingStatus] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  if (!referral) {
    return (
      <div className="dashboard-page">
        <EmptyState
          title="Referral not found"
          message="This referral may have been removed."
          action={
            <Button as={Link} to="/admin/referrals" variant="secondary">
              Back to Referrals
            </Button>
          }
        />
      </div>
    );
  }

  function handleStatusChange(e) {
    const next = e.target.value;
    if (next === referral.status) return;
    setPendingStatus(next);
  }

  function confirmStatusChange() {
    const updated = updateReferralStatus(referral.id, pendingStatus);
    setReferral(updated);
    setSuccessMsg(`Status updated to "${pendingStatus}".`);
    setPendingStatus(null);
  }

  return (
    <div className="dashboard-page">
      <Toast message={successMsg} type="success" onClose={() => setSuccessMsg("")} />

      <button className="back-link" onClick={() => navigate("/admin/referrals")}>
        ← Back to Referrals
      </button>

      <div className="page-heading">
        <h1>{referral.businessName}</h1>
        <p>Referral details and status management.</p>
      </div>

      <div className="dashboard-two-col">
        <Card>
          <h3>Referral Information</h3>
          <dl className="detail-list">
            <div>
              <dt>Referred Business</dt>
              <dd>{referral.businessName}</dd>
            </div>
            <div>
              <dt>Contact Name</dt>
              <dd>{referral.contactName || "—"}</dd>
            </div>
            <div>
              <dt>Package</dt>
              <dd>{referral.package}</dd>
            </div>
            <div>
              <dt>Project Value</dt>
              <dd>{formatNaira(referral.projectValue)}</dd>
            </div>
            <div>
              <dt>Date Submitted</dt>
              <dd>{formatDate(referral.createdAt)}</dd>
            </div>
            <div>
              <dt>Estimated Commission</dt>
              <dd>
                {formatNaira(referral.projectValue * DEMO_COMMISSION_RATE)}{" "}
                <span className="field-hint">(demo rate, not final)</span>
              </dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h3>Referrer</h3>
          <dl className="detail-list">
            <div>
              <dt>Name</dt>
              <dd>{referrer?.fullName || "Unknown"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{referrer?.email || "—"}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{referrer?.phone || "—"}</dd>
            </div>
            <div>
              <dt>Referral Code</dt>
              <dd>{referrer?.referralCode || "—"}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <Card>
        <h3>Manage Status</h3>
        <div className="status-manage-row">
          <span>Current status:</span>
          <Badge>{referral.status}</Badge>
        </div>
        <div className="field status-select-field">
          <label htmlFor="status">Change status</label>
          <select id="status" value={referral.status} onChange={handleStatusChange}>
            {REFERRAL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <ConfirmDialog
        open={Boolean(pendingStatus)}
        title="Change referral status?"
        message={`Set "${referral.businessName}" to "${pendingStatus}"?`}
        confirmLabel="Confirm"
        onConfirm={confirmStatusChange}
        onCancel={() => setPendingStatus(null)}
      />
    </div>
  );
}
