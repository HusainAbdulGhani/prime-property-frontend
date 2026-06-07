import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

let csrfInitialized = false;

export async function ensureCsrfCookie(): Promise<void> {
  if (csrfInitialized) return;
  await apiClient.get("/sanctum/csrf-cookie");
  csrfInitialized = true;
}

export function resetCsrfState(): void {
  csrfInitialized = false;
}

function getCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (!match) return null;
  return decodeURIComponent(match[1]);
}

apiClient.interceptors.request.use((config) => {
  const token = getCsrfToken();
  if (token) {
    config.headers["X-XSRF-TOKEN"] = token;
  }
  return config;
});

export async function apiRequest<T>(
  config: AxiosRequestConfig,
  options?: { requireCsrf?: boolean },
): Promise<T> {
  if (options?.requireCsrf) {
    await ensureCsrfCookie();
  }

  const response = await apiClient.request<T>(config);
  return response.data;
}

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
  }
  return fallback;
}
