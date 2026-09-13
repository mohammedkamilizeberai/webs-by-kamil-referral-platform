// services/auth.js
// MOCK / PROTOTYPE authentication.
//
// IMPORTANT: This is NOT secure. Passwords are stored in plaintext in
// localStorage purely so this frontend prototype has something to check
// against. This must be fully replaced before any real user data is
// involved.
//
// TODO: Replace register()/login()/logout() with Supabase Auth
// (supabase.auth.signUp / signInWithPassword / signOut), and replace the
// localStorage session with Supabase's session management.

import { getUserByEmail, createUser } from "./users";
import { generateReferralCode } from "../utils/referralCode";

const SESSION_KEY = "wbk_session";

export function registerReferrer({ fullName, email, phone, password }) {
  const existing = getUserByEmail(email);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }
  const user = {
    id: `usr_${Date.now()}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    password, // prototype only — see file header
    role: "referrer",
    referralCode: generateReferralCode(fullName),
    createdAt: new Date().toISOString(),
  };
  createUser(user);
  setSession(user.id, "referrer");
  return user;
}

export function login(email, password) {
  const user = getUserByEmail(email);
  if (!user || user.password !== password) {
    throw new Error("Incorrect email or password.");
  }
  setSession(user.id, user.role);
  return user;
}

export function loginAdmin(email, password) {
  const user = getUserByEmail(email);
  if (!user || user.password !== password) {
    throw new Error("Incorrect email or password.");
  }
  if (user.role !== "admin") {
    throw new Error("This account does not have admin access.");
  }
  setSession(user.id, "admin");
  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

function setSession(userId, role) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId, role }));
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
