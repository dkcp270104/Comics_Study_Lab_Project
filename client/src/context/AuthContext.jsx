import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";
import { AuthContext } from "./AuthContextInstance.js";

const storageKey = "comic-store-auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
    setCheckingToken(false);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem(storageKey, JSON.stringify({ user, token }));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [token, user]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token || user) {
        return;
      }
      try {
        const data = await apiRequest("/api/auth/me", { token });
        setUser(data.user);
      } catch {
        setUser(null);
        setToken(null);
      }
    };

    loadProfile();
  }, [token, user]);

  const signup = async (payload) => {
    const data = await apiRequest("/api/auth/signup", {
      method: "POST",
      body: payload,
    });
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const login = async (payload) => {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: payload,
    });
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, checkingToken, login, signup, logout }),
    [user, token, checkingToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
