import { apiClient } from "..";
import { LoginResponse } from "./types/login.response.type";
import { LoginSuccess } from "./types/login.success.type";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data: response } = await apiClient.post<LoginSuccess>("/auth/login", {
    email,
    password,
  });

  return response.data;
}
