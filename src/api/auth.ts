import api from "./axios";

export type User = {
  id: string;
  email: string;
  username?: string;
  name?: string;
  role?: string;
};

export type AuthResponse = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  user: User;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name?: string;
  username?: string;
};

export const loginApi = (payload: LoginRequest) =>
  api.post<AuthResponse>("/auth/login", payload);

export const registerApi = (payload: RegisterRequest) =>
  api.post<AuthResponse>("/auth/register", payload);

export const refreshApi = (refreshToken: string) =>
  api.post<AuthResponse>("/auth/refresh", { refreshToken });
