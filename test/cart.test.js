import { test } from "node:test";
import assert from "node:assert/strict";
import { computeSubtotal, computeShipping } from "../src/cart.js";
import { checkout } from "../src/checkout.js";

test("sous-total", () => {
  assert.equal(computeSubtotal([{ id: "mug", qty: 2 }]), 25);
});

test("livraison offerte dès 50€", () => {
  assert.equal(computeShipping(50), 0);
  assert.equal(computeShipping(49.99), 4.9);
});

test("checkout sans code promo", () => {
  assert.deepEqual(checkout([{ id: "moulin", qty: 1 }]), { subtotal: 49, discount: 0, shipping: 4.9, total: 53.9 });
});

test("checkout avec code promo BIENVENUE10", () => {
  assert.deepEqual(checkout([{ id: "cafe-bio", qty: 2 }], "BIENVENUE10"), { subtotal: 37.8, discount: 3.78, shipping: 4.9, total: 38.92 });
});

test("e-mail normalisé pour le reçu", async () => {
  const { normalizeEmail } = await import("../src/customer.js");
  assert.equal(normalizeEmail("  Client@Exemple.FR "), "client@exemple.fr");
});
