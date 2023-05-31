import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { User } from "src/types/user.type";
import { CreateUserResponse } from "./types/create-user.response";

export async function createUser(
  payload: Partial<User>,
  config?: AxiosRequestConfig
): Promise<User | undefined> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } = await apiClient.post<CreateUserResponse>(
    "/v1/users",
    payload,
    settings
  );

  return response.data;
}
