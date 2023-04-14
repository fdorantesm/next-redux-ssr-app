import { apiClient } from "..";
import { Raffle } from "../types/raffle.type";
import { GetRaffleResponse } from "./types/get-raffle.response.type";

export async function getRaffle(slug: string): Promise<Raffle> {
  const { data: body } = await apiClient.get<GetRaffleResponse>(
    `/v1/raffles/${slug}`
  );
  return body.data;
}
