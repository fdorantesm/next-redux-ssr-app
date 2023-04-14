import { Coupon } from "src/services/api/types/coupon.type";

export function calcDiscount(total: number, type: string, discount: number) {
  return type === "percentage" ? (discount / 100) * total : total - discount;
}
