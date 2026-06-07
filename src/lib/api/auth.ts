import type { AgentUser, LoginResponse, LockoutError } from "@/types/auth";
import {
  apiRequest,
  isAxiosError,
  resetCsrfState,
} from "@/lib/api/client";

const AUTH_STORAGE_KEY = "prime_property_agent";

export function getStoredAgent(): AgentUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AgentUser;
  } catch {
    return null;
  }
}

export function storeAgent(user: AgentUser): void {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredAgent(): void {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function loginAgent(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const data = await apiRequest<LoginResponse>(
    {
      method: "POST",
      url: "/agent/login",
      data: { email, password },
    },
    { requireCsrf: false },
  );
  storeAgent(data.user);
  return data;
}

export async function logoutAgent(): Promise<void> {
  try {
    await apiRequest(
      { 
        method: "POST", 
        url: "/agent/logout"
      },
      { requireCsrf: false },
    );
  } finally {
    clearStoredAgent();
    resetCsrfState();
  }
}

export function parseLockoutError(error: unknown): LockoutError | null {
  if (!isAxiosError(error) || error.response?.status !== 429) return null;
  const data = error.response.data as LockoutError;
  return {
    message:
      data.message ??
      "Akun terkunci karena terlalu banyak percobaan login gagal.",
    retry_after_seconds: data.retry_after_seconds ?? 900,
  };
}