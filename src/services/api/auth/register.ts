import { apiClient } from "..";
import { Register } from "./types/register.type";

export async function register(data: Register) {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
}
