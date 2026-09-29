import { computeSubtotal, computeShipping, round2 } from "./cart.js";

export function checkout(items) {
  const subtotal = computeSubtotal(items);
  const shipping = computeShipping(subtotal);
  return { subtotal: round2(subtotal), discount: 0, shipping, total: round2(subtotal + shipping) };
}
