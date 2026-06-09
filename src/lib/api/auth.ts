import type { AgentUser, LoginResponse, LockoutError } from "@/types/auth";
import {
  clearAuthToken,
  apiRequest,
  isAxiosError,
  storeAuthToken,
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

function isAgentUser(value: unknown): value is AgentUser {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<AgentUser>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    (candidate.role === "admin" || candidate.role === "superadmin")
  );
}

function extractAgentUser(payload: unknown): AgentUser | null {
  if (isAgentUser(payload)) return payload;

  if (!payload || typeof payload !== "object") return null;

  const candidate = payload as {
    user?: unknown;
    data?: unknown;
    agent?: unknown;
  };

  return (
    (isAgentUser(candidate.user) && candidate.user) ||
    (isAgentUser(candidate.data) && candidate.data) ||
    (isAgentUser(candidate.agent) && candidate.agent) ||
    null
  );
}

function extractToken(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;

  const candidate = payload as {
    token?: unknown;
    access_token?: unknown;
    data?: { token?: unknown; access_token?: unknown };
  };

  if (typeof candidate.token === "string") return candidate.token;
  if (typeof candidate.access_token === "string") return candidate.access_token;
  if (typeof candidate.data?.token === "string") return candidate.data.token;
  if (typeof candidate.data?.access_token === "string") return candidate.data.access_token;

  return undefined;
}

export async function loginAgent(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const payload = await apiRequest<LoginResponse>(
    {
      method: "POST",
      url: "/agent/login",
      data: { email, password },
    },
  );

  const currentAgent = extractAgentUser(payload);
  const token = extractToken(payload);

  if (!currentAgent) {
    throw new Error("Login berhasil, tetapi data user tidak ditemukan di response backend.");
  }

  if (!token) {
    throw new Error("Login berhasil, tetapi token tidak ditemukan di response backend.");
  }

  storeAuthToken(token);
  storeAgent(currentAgent);

  return {
    message: payload.message ?? "Login berhasil.",
    user: currentAgent,
    token,
    token_type: "Bearer",
  };
}

export async function logoutAgent(): Promise<void> {
  try {
    await apiRequest(
      {
        method: "POST",
        url: "/agent/logout",
      },
    );
    clearStoredAgent();
    clearAuthToken();

  } catch (error) {
    console.error("Gagal logout di server, tapi tetep kita bersihin lokal:", error);
    clearStoredAgent();
    clearAuthToken();
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
