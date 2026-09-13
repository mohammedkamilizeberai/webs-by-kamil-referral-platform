export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export function isValidPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 14;
}

export function isStrongEnoughPassword(value) {
  return String(value || "").length >= 8;
}

// Returns an object of fieldName -> error message. Empty object means valid.
export function validateRegisterForm(fields) {
  const errors = {};
  if (!fields.fullName || fields.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!isValidEmail(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!isValidPhone(fields.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!isStrongEnoughPassword(fields.password)) {
    errors.password = "Password must be at least 8 characters.";
  }
  if (fields.confirmPassword !== fields.password) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}

export function validateLoginForm(fields) {
  const errors = {};
  if (!isValidEmail(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.password) {
    errors.password = "Please enter your password.";
  }
  return errors;
}
