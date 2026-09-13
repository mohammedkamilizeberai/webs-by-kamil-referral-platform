// services/admin.js
// MOCK implementation. Aggregates data from the users/referrals mock stores.
// TODO: Replace with Supabase queries/views once connected — most of these
// aggregate stats would ideally be computed with SQL (COUNT/SUM/GROUP BY)
// or a Postgres view rather than client-side, for accuracy and scale.

import { getAllReferrerUsers, getUserById } from "./users";
import { getAllReferrals } from "./referrals";

export function getReferrerDirectory() {
  const referrers = getAllReferrerUsers();
  const referrals = getAllReferrals();
  return referrers.map((referrer) => {
    const theirReferrals = referrals.filter(
      (r) => r.referrerId === referrer.id
    );
    return {
      ...referrer,
      totalReferrals: theirReferrals.length,
      status: theirReferrals.length > 0 ? "Active" : "New",
    };
  });
}

export function getReferralDirectory() {
  const referrals = getAllReferrals();
  return referrals.map((r) => {
    const referrer = getUserById(r.referrerId);
    return {
      ...r,
      referrerName: referrer ? referrer.fullName : "Unknown",
    };
  });
}

export function getOverviewStats() {
  const referrers = getAllReferrerUsers();
  const referrals = getAllReferrals();

  const totalReferrers = referrers.length;
  const totalReferrals = referrals.length;
  const pendingReferrals = referrals.filter(
    (r) => r.status === "Pending"
  ).length;
  const completedReferrals = referrals.filter(
    (r) => r.status === "Completed"
  ).length;
  const totalProjectValue = referrals.reduce(
    (sum, r) => sum + (r.projectValue || 0),
    0
  );

  const statusBreakdown = [
    "Pending",
    "Contacted",
    "In Progress",
    "Completed",
    "Cancelled",
  ].map((status) => ({
    status,
    count: referrals.filter((r) => r.status === status).length,
  }));

  return {
    totalReferrers,
    totalReferrals,
    pendingReferrals,
    completedReferrals,
    totalProjectValue,
    statusBreakdown,
  };
}

export function getRecentActivity(limit = 6) {
  const referrals = getAllReferrals();
  return [...referrals]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit)
    .map((r) => {
      const referrer = getUserById(r.referrerId);
      return { ...r, referrerName: referrer ? referrer.fullName : "Unknown" };
    });
}
