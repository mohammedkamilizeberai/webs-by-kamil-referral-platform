import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validateLoginForm } from "../../utils/validators";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function AdminLogin() {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [fields, setFields] = useState({ email: "", password: "" });
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
    const fieldErrors = validateLoginForm(fields);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    try {
      await loginAdmin(fields.email, fields.password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page auth-page-admin">
      <div className="container auth-container">
        <Card className="auth-card">
          <span className="section-label">Admin Access</span>
          <h1>Admin Login</h1>
          <p className="auth-subtext">Restricted to Webs By Kamil administrators.</p>

          <div className="demo-note">
            Demo login — email: <strong>admin@webskamil.com</strong>, password:{" "}
            <strong>Admin1234</strong>
          </div>

          <form onSubmit={handleSubmit} noValidate>
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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={fields.password}
                onChange={handleChange}
              />
              {errors.password ? (
                <span className="field-error">{errors.password}</span>
              ) : null}
            </div>

            {submitError ? <div className="form-alert">{submitError}</div> : null}

            <Button type="submit" variant="primary" size="lg" className="btn-block" loading={submitting}>
              Log In
            </Button>
          </form>

          <p className="auth-switch">
            <Link to="/login">Referrer login</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
