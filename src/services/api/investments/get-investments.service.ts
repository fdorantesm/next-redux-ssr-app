import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { GetInvestmentsSuccessResponse } from "./types/get-investments.success";
import { Investment } from "src/types/investment.type";

export async function getInvestments(
  userId?: string,
  config?: AxiosRequestConfig
): Promise<Investment[]> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
    },
  };

  const filter: Partial<Investment> = {};

  if (userId) {
    filter.userId = userId;
  }

  const params = new URLSearchParams(filter as Record<string, string>);
  const qs = params.toString();

  const { data: response } = await apiClient.get<GetInvestmentsSuccessResponse>(
    `/v1/investments?${qs}`,
    settings
  );

  return response.data;
}
