import { useState, useCallback } from "react";

const AUTH_KEY = "portfolio_admin_auth";
const DEMO_EMAIL = "admin@portfolio.dev";
const DEMO_PASSWORD = "admin123";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });

  const login = useCallback(
    (email: string, password: string): boolean => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem(AUTH_KEY, "true");
        setIsAuthenticated(true);
        return true;
      }
      return false;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
