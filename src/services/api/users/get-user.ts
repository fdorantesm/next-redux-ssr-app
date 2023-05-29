import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { User } from "src/types/user.type";
import { GetUserResponse } from "./types/get-user.response";

export async function getUser(
  uuid: string,
  config?: AxiosRequestConfig
): Promise<User> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const { data: response } = await apiClient.get<GetUserResponse>(
    `/v1/users/${uuid}`,
    settings
  );
  return response.data;
}
