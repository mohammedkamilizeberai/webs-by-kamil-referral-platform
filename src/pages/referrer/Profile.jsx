import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { updateUser } from "../../services/users";
import { formatDate } from "../../utils/formatters";
import { isValidPhone } from "../../utils/validators";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Toast from "../../components/Toast";

export default function Profile() {
  const { user } = useAuth();
  const [fields, setFields] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!fields.fullName.trim()) {
      setError("Full name cannot be empty.");
      return;
    }
    if (!isValidPhone(fields.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setSaving(true);
    updateUser(user.id, { fullName: fields.fullName.trim(), phone: fields.phone.trim() });
    setSaving(false);
    setSuccessMsg("Profile updated.");
  }

  return (
    <div className="dashboard-page">
      <Toast message={successMsg} type="success" onClose={() => setSuccessMsg("")} />

      <div className="page-heading">
        <h1>Profile</h1>
        <p>Your referrer account details.</p>
      </div>

      <Card className="profile-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              value={fields.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input value={user?.email || ""} disabled />
            <span className="field-hint">Email cannot be changed in this prototype.</span>
          </div>

          <div className="field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" value={fields.phone} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Referral Code</label>
            <input value={user?.referralCode || ""} disabled />
          </div>

          <div className="field">
            <label>Member Since</label>
            <input value={formatDate(user?.createdAt)} disabled />
          </div>

          {error ? <div className="form-alert">{error}</div> : null}

          <Button type="submit" variant="primary" loading={saving}>
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
}
