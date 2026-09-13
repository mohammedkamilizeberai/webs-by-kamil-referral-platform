// services/referrals.js
// MOCK implementation backed by localStorage.
// TODO: Replace all functions in this file with Supabase queries against
// a `referrals` table (with row-level security scoping referrers to their
// own rows, and admins able to see all rows).

import { SEED_REFERRALS } from "../data/mockReferrals";

const REFERRALS_KEY = "wbk_referrals";

function loadReferrals() {
  try {
    const raw = localStorage.getItem(REFERRALS_KEY);
    if (!raw) {
      localStorage.setItem(REFERRALS_KEY, JSON.stringify(SEED_REFERRALS));
      return [...SEED_REFERRALS];
    }
    return JSON.parse(raw);
  } catch {
    return [...SEED_REFERRALS];
  }
}

function saveReferrals(referrals) {
  localStorage.setItem(REFERRALS_KEY, JSON.stringify(referrals));
}

export function getAllReferrals() {
  return loadReferrals();
}

export function getReferralsByReferrerId(referrerId) {
  return loadReferrals().filter((r) => r.referrerId === referrerId);
}

export function getReferralById(id) {
  return loadReferrals().find((r) => r.id === id) || null;
}

export function updateReferralStatus(id, status) {
  const referrals = loadReferrals();
  const idx = referrals.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  referrals[idx] = { ...referrals[idx], status };
  saveReferrals(referrals);
  return referrals[idx];
}
