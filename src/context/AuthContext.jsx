import { createContext, useEffect, useMemo, useState } from "react";
import {
  getSession,
  login as loginService,
  loginAdmin as loginAdminService,
  logout as logoutService,
  registerReferrer as registerReferrerService,
} from "../services/auth";
import { getUserById } from "../services/users";

// PROTOTYPE AUTH STATE.
// TODO: Once Supabase is connected, this context should subscribe to
// supabase.auth.onAuthStateChange() instead of reading a localStorage
// session on mount.

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session?.userId) {
      const found = getUserById(session.userId);
      setUser(found);
    }
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      role: user?.role || null,
      loading,
      isAuthenticated: Boolean(user),
      async loginReferrer(email, password) {
        const loggedIn = loginService(email, password);
        setUser(loggedIn);
        return loggedIn;
      },
      async loginAdmin(email, password) {
        const loggedIn = loginAdminService(email, password);
        setUser(loggedIn);
        return loggedIn;
      },
      async register(fields) {
        const created = registerReferrerService(fields);
        setUser(created);
        return created;
      },
      logout() {
        logoutService();
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
