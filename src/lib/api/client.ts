import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || "https://prime-property-backend-hazel.vercel.app";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL.replace(/\/$/, "")}/api`,
  withCredentials: false, 
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

let csrfInitialized = true;

export async function ensureCsrfCookie(): Promise<void> {
  return; 
}

export function resetCsrfState(): void {
  csrfInitialized = true;
}

function getCsrfToken(): string | null {
  return null;
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