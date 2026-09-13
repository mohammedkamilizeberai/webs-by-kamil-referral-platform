import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateRegisterForm } from "../../utils/validators";
import Card from "../../components/Card";
import Button from "../../components/Button";

const initialFields = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  referralCode: "",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    const fieldErrors = validateRegisterForm(fields);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    try {
      await register(fields);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <Card className="auth-card">
          <span className="section-label">Become a Referrer</span>
          <h1>Create Your Referrer Account</h1>
          <p className="auth-subtext">
            Register to get your unique referral link and start tracking referrals.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={fields.fullName}
                onChange={handleChange}
              />
              {errors.fullName ? <span className="field-error">{errors.fullName}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={handleChange}
              />
              {errors.email ? <span className="field-error">{errors.email}</span> : null}
            </div>

            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={handleChange}
              />
              {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={fields.password}
                  onChange={handleChange}
                />
                {errors.password ? (
                  <span className="field-error">{errors.password}</span>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={fields.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword ? (
                  <span className="field-error">{errors.confirmPassword}</span>
                ) : null}
              </div>
            </div>

            <div className="field">
              <label htmlFor="referralCode">Referral Code (optional)</label>
              <input
                id="referralCode"
                name="referralCode"
                type="text"
                value={fields.referralCode}
                onChange={handleChange}
                placeholder="If someone referred you"
              />
            </div>

            {submitError ? <div className="form-alert">{submitError}</div> : null}

            <Button type="submit" variant="primary" size="lg" className="btn-block" loading={submitting}>
              Create Account
            </Button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
