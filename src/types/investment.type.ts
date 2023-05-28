import { Ranch } from "./ranche.type";
import { User } from "./user.type";

export type Investment = {
  uuid: string;
  ranchId: string;
  plantsQuantity: number;
  purchasePrice: number;
  plantWeight: number;
  seedCapital: number;
  surfacePercentage: number;
  userId: string;
  user: User;
  ranch?: Ranch;
  metrics?: {
    returnal: number;
    fee: number;
    seedCapital: number;
    grossProfit: number;
    netProfit: number;
    harvestDate: Date;
  };
};
