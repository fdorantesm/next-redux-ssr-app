export type Coupon = {
  uuid: string;
  name: string;
  code: string;
  description: string;
  discount: number;
  discountType: string;
  expiresAt: Date;
  minimumPurchaseAmount: number;
  isActive: boolean;
};
