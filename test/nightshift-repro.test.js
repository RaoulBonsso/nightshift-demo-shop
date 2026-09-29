import { test } from "node:test";
import assert from "node:assert/strict";
import { checkout } from "../src/checkout.js";
import { ValidationError } from "../src/errors.js";

test("POST /api/checkout : un code promo inconnu (bienvenu10) avec un panier vide est refusé en ValidationError, pas en TypeError", () => {
  assert.throws(
    () => checkout([], "bienvenu10"),
    (err) => {
      assert.ok(err instanceof ValidationError, `ValidationError attendue, reçu: ${err && err.name}: ${err && err.message}`);
      return true;
    }
  );
});

test("un code promo inconnu avec un panier valide est refusé en ValidationError", () => {
  assert.throws(
    () => checkout([{ id: "mug", qty: 1 }], "bienvenu10"),
    (err) => {
      assert.ok(err instanceof ValidationError, `ValidationError attendue, reçu: ${err && err.name}: ${err && err.message}`);
      return true;
    }
  );
});

test("un code promo valide continue de fonctionner", () => {
  assert.deepEqual(
    checkout([{ id: "cafe-bio", qty: 2 }], "BIENVENUE10"),
    { subtotal: 37.8, discount: 3.78, shipping: 4.9, total: 38.92 }
  );
});
