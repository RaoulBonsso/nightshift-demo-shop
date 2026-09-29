import { test } from "node:test";
import assert from "node:assert/strict";
import { checkout } from "../src/checkout.js";

test("un code promo inconnu (\"ooo\") ne fait pas planter le checkout et est ignoré sans remise", () => {
  const items = [{ id: "cafe-bio", qty: 2 }];
  let result;
  assert.doesNotThrow(() => {
    result = checkout(items, "ooo");
  });
  assert.deepEqual(result, { subtotal: 37.8, discount: 0, shipping: 4.9, total: 42.7 });
  assert.deepEqual(result, checkout(items));
});
