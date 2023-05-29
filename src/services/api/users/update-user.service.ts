import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { User } from "src/types/user.type";
import { UpdateUserResponse } from "./types/update-user.response";

export async function updateUser(
  uuid: string,
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

  const { data: response } = await apiClient.patch<UpdateUserResponse>(
    `/v1/users/${uuid}`,
    payload,
    settings
  );
  return response.data;
}
