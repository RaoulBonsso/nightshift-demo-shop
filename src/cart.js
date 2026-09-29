export const PRODUCTS = {
  "cafe-bio": { name: "Café bio 1kg", price: 18.9 },
  "mug": { name: "Mug céramique", price: 12.5 },
  "moulin": { name: "Moulin manuel", price: 49.0 },
};

export function computeSubtotal(items) {
  return items.reduce((sum, { id, qty }) => sum + PRODUCTS[id].price * qty, 0);
}

export function computeShipping(subtotal) {
  return subtotal >= 50 ? 0 : 4.9;
}

export function round2(n) {
  return Math.round(n * 100) / 100;
}
