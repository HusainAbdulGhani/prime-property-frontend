export type UserRole = "admin" | "superadmin";

export interface AgentUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  message: string;
  user: AgentUser;
  token: string;
  token_type: "Bearer";
}

export interface LockoutError {
  message: string;
  retry_after_seconds: number;
}
