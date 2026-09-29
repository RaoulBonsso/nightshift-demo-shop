import { computeSubtotal, computeShipping, round2 } from "./cart.js";
import { COUPONS } from "./coupons.js";

export function checkout(items, couponCode) {
  const subtotal = computeSubtotal(items);
  let discount = 0;
  if (couponCode) {
    const coupon = Object.hasOwn(COUPONS, couponCode) ? COUPONS[couponCode] : undefined;
    if (coupon) {
      discount = (subtotal * coupon.percent) / 100;
    }
  }
  const shipping = computeShipping(subtotal - discount);
  return {
    subtotal: round2(subtotal),
    discount: round2(discount),
    shipping,
    total: round2(subtotal - discount + shipping),
  };
}
