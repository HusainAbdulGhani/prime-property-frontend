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

function extractMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;

  const candidate = payload as {
    message?: unknown;
    data?: { message?: unknown };
  };

  if (typeof candidate.message === "string") return candidate.message;
  if (typeof candidate.data?.message === "string") return candidate.data.message;

  return undefined;
}

async function fetchCurrentAgent(): Promise<AgentUser> {
  const candidateEndpoints = ["/user", "/agent/me", "/agent/profile"];

  for (const url of candidateEndpoints) {
    try {
      const payload = await apiRequest<unknown>({ method: "GET", url });
      const user = extractAgentUser(payload);
      if (user) return user;
    } catch {
      continue;
    }
  }

  throw new Error(
    "Login berhasil, tetapi data agent tidak bisa diambil dari session backend.",
  );
}

export async function loginAgent(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const payload = await apiRequest<unknown>(
    {
      method: "POST",
      url: "/agent/login",
      data: { email, password },
    },
    { requireCsrf: true },
  );

  const responseMessage = extractMessage(payload);
  const currentAgent = extractAgentUser(payload) ?? (await fetchCurrentAgent());
  storeAgent(currentAgent);

  return {
    message: responseMessage ?? "Login berhasil.",
    user: currentAgent,
  };
}

export async function logoutAgent(): Promise<void> {
  try {
    await apiRequest(
      {
        method: "POST",
        url: "/agent/logout",
      },
      { requireCsrf: true },
    );
    clearStoredAgent();
    resetCsrfState();

  } catch (error) {
    console.error("Gagal logout di server, tapi tetep kita bersihin lokal:", error);
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
