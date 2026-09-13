// DEMO / MOCK DATA — for prototype purposes only.
// TODO: Replace with real user records from Supabase's `profiles` table.
// NOTE: Storing plaintext passwords like this is only acceptable because this
// is a local-only frontend prototype with no real backend. This must never
// be done once Supabase Auth is connected — see services/auth.js.

export const SEED_USERS = [
  {
    id: "usr_admin_1",
    fullName: "Kamil Ibrahim",
    email: "admin@webskamil.com",
    password: "Admin1234",
    phone: "08037697740",
    role: "admin",
    referralCode: null,
    createdAt: "2026-06-01T09:00:00.000Z",
  },
  {
    id: "usr_ref_1",
    fullName: "Amaka Johnson",
    email: "referrer@demo.com",
    password: "Demo1234",
    phone: "08012345678",
    role: "referrer",
    referralCode: "AMAK-7X2Q",
    createdAt: "2026-07-15T10:30:00.000Z",
  },
  {
    id: "usr_ref_2",
    fullName: "Tunde Bakare",
    email: "tunde.bakare@demo.com",
    password: "Demo1234",
    phone: "08023456789",
    role: "referrer",
    referralCode: "TUND-9K3M",
    createdAt: "2026-07-20T14:15:00.000Z",
  },
  {
    id: "usr_ref_3",
    fullName: "Grace Okoro",
    email: "grace.okoro@demo.com",
    password: "Demo1234",
    phone: "08034567890",
    role: "referrer",
    referralCode: "GRAC-2P8L",
    createdAt: "2026-08-02T08:45:00.000Z",
  },
];
