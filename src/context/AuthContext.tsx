"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  clearStoredAgent,
  getStoredAgent,
  loginAgent,
  logoutAgent,
  storeAgent,
} from "@/lib/api/auth";
import type { AgentUser } from "@/types/auth";

interface AuthContextValue {
  user: AgentUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isSuperadmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AgentUser | null>(() => {
    if (typeof window === "undefined") return null;
    return getStoredAgent();
  });
  const [isLoading] = useState(false);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await loginAgent(email, password);
      storeAgent(response.user);
      setUser(response.user);
      router.push("/dashboard");
    },
    [router],
  );

  const logout = useCallback(async () => {
    await logoutAgent();
    clearStoredAgent();
    setUser(null);
    router.push("/agent/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
      isSuperadmin: user?.role === "superadmin",
    }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
