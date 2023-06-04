import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { Contract } from "src/types/contract.type";
import { GetContractResponseType } from "./types/get-contract.response.type";

export async function getContract(
  investmentId: string,
  config?: AxiosRequestConfig
): Promise<Contract> {
  const bearer = await getBearerAuth();
  const settings = {
    ...config,
    headers: {
      ...bearer,
      ...config?.headers,
      "Content-Type": "boundary",
    },
  };

  const { data: response } = await apiClient.get<GetContractResponseType>(
    `/v1/investments/${investmentId}/contract`,
    settings
  );

  return response.data;
}
