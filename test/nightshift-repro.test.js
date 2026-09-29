import { test } from "node:test";
import assert from "node:assert/strict";
import { checkout } from "../src/checkout.js";

const items = [{ id: "cafe-bio", qty: 2 }];

test("un code promo est accepté quelle que soit la casse (bienvenue10)", () => {
  assert.deepEqual(checkout(items, "bienvenue10"), {
    subtotal: 37.8,
    discount: 3.78,
    shipping: 4.9,
    total: 38.92,
  });
});

test("un code promo avec casse mixte est accepté (Bienvenue10)", () => {
  assert.deepEqual(checkout(items, "Bienvenue10"), {
    subtotal: 37.8,
    discount: 3.78,
    shipping: 4.9,
    total: 38.92,
  });
});

test("un code promo inconnu ne fait pas planter le checkout et est ignoré sans remise", () => {
  let result;
  assert.doesNotThrow(() => {
    result = checkout(items, "CODEINCONNU");
  });
  assert.deepEqual(result, {
    subtotal: 37.8,
    discount: 0,
    shipping: 4.9,
    total: 42.7,
  });
});
