# Webs By Kamil — Referral Platform (Prototype)

A referral platform for Webs By Kamil (website design for small and local
businesses). Referrers register, get a unique referral link, and track the
businesses they refer. Admins get a separate dashboard to manage all
referrers and referrals.

**This is a frontend prototype.** There is no real backend yet — everything
is powered by mock data and `localStorage`, structured so Supabase can be
connected later without rebuilding the UI. See "What uses mock data" below.

## Tech stack

- React 18 + Vite
- React Router DOM (client-side routing, protected routes)
- Plain CSS (custom design system — no UI framework)
- `localStorage` for prototype persistence

## How to run it

This project was built without the ability to run `npm install` (no network
access in the build environment), so it has **not** been run/tested live —
see the honest testing notes below.

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Demo login credentials

**Referrer account:**
- Email: `referrer@demo.com`
- Password: `Demo1234`

Two more seeded referrers (`tunde.bakare@demo.com`, `grace.okoro@demo.com`,
same password) exist so the admin views aren't empty.

**Admin account** (go to `/admin/login`):
- Email: `admin@webskamil.com`
- Password: `Admin1234`

You can also register a brand-new referrer account from `/register`.

## What currently uses mock data

- **Authentication** (`src/services/auth.js`) — plaintext password check
  against `localStorage`. Explicitly NOT secure; prototype only.
- **Users/referrers** (`src/services/users.js`) — seeded from
  `src/data/mockUsers.js`, persisted to `localStorage` after that.
- **Referrals** (`src/services/referrals.js`) — seeded from
  `src/data/mockReferrals.js`.
- **Admin aggregates** (`src/services/admin.js`) — computed client-side from
  the above.
- **Commission figures** — a hardcoded 10% demo rate in
  `Dashboard.jsx` and `AdminReferralDetails.jsx`, clearly labeled as a
  placeholder, not a real business rule.

## Exactly what to replace when Supabase is connected

Every file under `src/services/` has a `TODO: Replace with Supabase...`
comment at the relevant function. In short:

| Mock (now) | Replace with |
|---|---|
| `services/auth.js` localStorage session | `supabase.auth.signUp/signInWithPassword/signOut`, `supabase.auth.onAuthStateChange` in `AuthContext.jsx` |
| `services/users.js` localStorage array | Supabase `profiles` table queries |
| `services/referrals.js` localStorage array | Supabase `referrals` table queries (with Row Level Security scoping referrers to their own rows) |
| `services/admin.js` client-side aggregation | Supabase views/SQL aggregates, or server-side functions |
| `AdminProtectedRoute.jsx` client-only role check | Must ALSO be enforced server-side via RLS — client-side guarding alone is not real security |
| Referral code generation (`utils/referralCode.js`) | Server-side generation (e.g. a Postgres function/trigger) to guarantee uniqueness |

**Do not connect Supabase until explicitly instructed to** — nothing above
has been implemented, per your instructions.

## File structure

```
src/
  main.jsx, App.jsx, index.css
  context/AuthContext.jsx
  components/        Button, Card, StatCard, Badge, Table, EmptyState,
                      Navbar, Footer, ProtectedRoute, AdminProtectedRoute,
                      ConfirmDialog, Toast
  layouts/            PublicLayout, DashboardLayout, AdminLayout
  pages/public/        Landing, HowItWorks, Packages, BecomeReferrer,
                       Login, Register
  pages/referrer/      Dashboard, MyReferrals, Profile
  pages/admin/         AdminLogin, AdminDashboard, AdminReferrers,
                       AdminReferrals, AdminReferralDetails
  services/            auth.js, users.js, referrals.js, admin.js
  data/                mockUsers.js, mockReferrals.js
  hooks/               useAuth.js, useClipboard.js, useLocalStorage.js
  utils/               referralCode.js, formatters.js, validators.js
```

## Honest testing notes

The sandbox this was built in has no network access, so `npm install` could
not be run and this project has **not** been executed in a real browser.
What I verified instead, statically:

- Every `import` path in every file resolves to a file that actually exists
  in this project (checked programmatically).
- Every component/page referenced in `App.jsx`'s routes exists and is
  exported correctly.
- JSX tags and braces are balanced in every file (checked programmatically).
- No `console.log`/`debugger` statements left in the code.
- Every service function called from a page exists and is exported from the
  corresponding `services/` file.

What this does **not** guarantee: that the app actually renders correctly,
that there are no runtime errors, or that the styling looks right in a real
browser. Please run `npm install && npm run dev` yourself and click through
it before treating this as fully verified.
