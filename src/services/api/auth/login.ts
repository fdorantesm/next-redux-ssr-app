import { apiClient } from "..";

export async function login(email: string, password: string) {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}
