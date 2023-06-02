import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { User } from "src/types/user.type";
import { CreatePartnerResponse } from "./type/create-partner.response";

export async function createPartner(
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

  const { data: response } = await apiClient.post<CreatePartnerResponse>(
    "/v1/partners",
    payload,
    settings
  );

  return response.data;
}
