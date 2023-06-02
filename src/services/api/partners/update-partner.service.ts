import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { User } from "src/types/user.type";
import { UpdatePartnerResponse } from "./type/update-partner.response";

export async function updatePartner(
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

  const { data: response } = await apiClient.patch<UpdatePartnerResponse>(
    `/v1/partners/${uuid}`,
    payload,
    settings
  );
  return response.data;
}
