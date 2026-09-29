import { test } from "node:test";
import assert from "node:assert/strict";
import { checkout } from "../src/checkout.js";
import { ValidationError } from "../src/errors.js";

test("checkout avec un produit inconnu (the-vert) est refusé proprement par une ValidationError", () => {
  assert.throws(
    () => checkout([{ id: "the-vert", qty: 1 }]),
    (err) => {
      assert.ok(err instanceof ValidationError, `ValidationError attendue, reçu: ${err && err.name}: ${err && err.message}`);
      return true;
    }
  );
});

test("un produit inconnu mélangé à des produits valides refuse tout le panier", () => {
  assert.throws(
    () => checkout([{ id: "mug", qty: 1 }, { id: "the-vert", qty: 1 }], "BIENVENUE10"),
    (err) => err instanceof ValidationError
  );
});

test("un panier valide continue de fonctionner", () => {
  assert.deepEqual(checkout([{ id: "mug", qty: 2 }]), { subtotal: 25, discount: 0, shipping: 4.9, total: 29.9 });
});
