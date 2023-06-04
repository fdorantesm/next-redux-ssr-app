import { AxiosRequestConfig } from "axios";

import { apiClient } from "..";
import { getBearerAuth } from "../utils/get-bearer-auth.util";
import { CreateContractResponseType } from "./types/create-contract.response.type";
import { Contract } from "src/types/contract.type";

export async function createContract(
  contract: FormData,
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

  const { data: response } = await apiClient.post<CreateContractResponseType>(
    `/v1/contracts`,
    contract,
    settings
  );

  return response.data;
}
