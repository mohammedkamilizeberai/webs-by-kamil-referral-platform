// services/users.js
// MOCK implementation backed by localStorage.
// TODO: Replace all functions in this file with Supabase queries against
// a `profiles` table once Supabase is connected. Keep the same function
// signatures so pages/components don't need to change.

import { SEED_USERS } from "../data/mockUsers";

const USERS_KEY = "wbk_users";

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      return [...SEED_USERS];
    }
    return JSON.parse(raw);
  } catch {
    return [...SEED_USERS];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getAllUsers() {
  return loadUsers();
}

export function getAllReferrerUsers() {
  return loadUsers().filter((u) => u.role === "referrer");
}

export function getUserById(id) {
  return loadUsers().find((u) => u.id === id) || null;
}

export function getUserByEmail(email) {
  const normalized = String(email || "").trim().toLowerCase();
  return (
    loadUsers().find((u) => u.email.toLowerCase() === normalized) || null
  );
}

export function createUser(user) {
  const users = loadUsers();
  const next = [...users, user];
  saveUsers(next);
  return user;
}

export function updateUser(id, patch) {
  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch };
  saveUsers(users);
  return users[idx];
}
