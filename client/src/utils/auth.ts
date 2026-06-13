import { api } from "@/api/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
}

const TOKEN_KEY = "gnaid_token";
const USER_KEY = "gnaid_user";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const { data } = await api.post<{ token: string; user: AuthUser }>("/auth/login", {
    email,
    password,
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export async function signup(
  name: string,
  email: string,
  password: string
): Promise<AuthUser> {
  const { data } = await api.post<{ token: string; user: AuthUser }>(
    "/auth/register",
    { name, email, password }
  );
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
