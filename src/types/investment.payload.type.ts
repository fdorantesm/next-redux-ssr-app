import { Investment } from "./investment.type";

export type InvestmentPayload = Omit<
  Investment,
  "uuid" | "metrics" | "ranch" | "user"
>;
