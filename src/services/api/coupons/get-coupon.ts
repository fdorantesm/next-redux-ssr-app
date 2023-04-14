import { apiClient } from "..";
import { Coupon } from "../types/coupon.type";
import { GetCouponResponse } from "./types/get-coupon.response.type";

export async function getCoupon(couponCode: string): Promise<Coupon> {
  try {
    const { data: body } = await apiClient.get<GetCouponResponse>(
      `/v1/coupons/${couponCode}`
    );
    return body.data;
  } catch (error: any) {
    throw error.response;
  }
}
