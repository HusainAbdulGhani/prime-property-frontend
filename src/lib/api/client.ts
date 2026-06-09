import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://prime-property-backend-hazel.vercel.app";
const API_ORIGIN = API_BASE_URL.replace(/\/$/, "");
const API_ENDPOINT = `${API_ORIGIN}/api`;

const commonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
} as const;

export const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  withXSRFToken: true,
  headers: commonHeaders,
});

const csrfClient = axios.create({
  baseURL: API_ORIGIN,
  withCredentials: true,
  headers: commonHeaders,
});

let csrfInitialized = false;

export async function ensureCsrfCookie(): Promise<void> {
  if (typeof window === "undefined") return;

  if (csrfInitialized) {
    return;
  }

  await csrfClient.get("/sanctum/csrf-cookie");

  csrfInitialized = true;
}

export function resetCsrfState(): void {
  csrfInitialized = false;
}

function requiresCsrfByMethod(method?: string): boolean {
  const normalizedMethod = method?.toLowerCase();
  return (
    normalizedMethod === "post" ||
    normalizedMethod === "put" ||
    normalizedMethod === "patch" ||
    normalizedMethod === "delete"
  );
}

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

export async function apiRequest<T>(
  config: AxiosRequestConfig,
  options?: { requireCsrf?: boolean },
): Promise<T> {
  const shouldInitializeCsrf =
    options?.requireCsrf ?? requiresCsrfByMethod(config.method);

  if (shouldInitializeCsrf) {
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
