// Generates a short, human-friendly referral code from a person's name.
// This is a purely local/mock implementation for the prototype.
// TODO: When Supabase is connected, referral codes should be generated
// and guaranteed-unique server-side (e.g. via a Postgres function or trigger).

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars (0/O, 1/I)

function randomSuffix(length = 4) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

export function generateReferralCode(fullName = "") {
  const cleaned = fullName.trim().split(/\s+/)[0] || "WBK";
  const prefix = cleaned.slice(0, 4).toUpperCase().padEnd(4, "X");
  return `${prefix}-${randomSuffix(4)}`;
}

export function buildReferralLink(referralCode) {
  // In production this should point at the real public domain.
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://webbykamil-referrals.example";
  return `${base}/?ref=${encodeURIComponent(referralCode)}`;
}
