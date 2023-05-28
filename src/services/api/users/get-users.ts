import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { GetUsersResponse } from "./types/get-users.response";
import { User } from "src/types/user.type";

export async function getUsers(config?: AxiosRequestConfig): Promise<User[]> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  try {
    const { data: response } = await apiClient.get<GetUsersResponse>(
      "/v1/users",
      settings
    );
    return response.data;
  } catch (error) {
    return [];
  }
}
