import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { User } from "src/types/user.type";
import { GetPartnerResponse } from "./type/get-partner.response";

export async function getPartner(
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

  const { data: response } = await apiClient.get<GetPartnerResponse>(
    `/v1/partners/${uuid}`,
    settings
  );
  return response.data;
}
