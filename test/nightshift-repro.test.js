import { test } from "node:test";
import assert from "node:assert/strict";
import { checkout } from "../src/checkout.js";
import { ValidationError } from "../src/errors.js";

test("code promo saisi en minuscules (bienvenue10) est reconnu comme BIENVENUE10", () => {
  const result = checkout([{ id: "cafe-bio", qty: 2 }], "bienvenue10");
  assert.deepEqual(result, { subtotal: 37.8, discount: 3.78, shipping: 4.9, total: 38.92 });
});

test("code promo avec espaces et casse mixte est normalisé", () => {
  const result = checkout([{ id: "cafe-bio", qty: 2 }], "  Bienvenue10 ");
  assert.deepEqual(result, { subtotal: 37.8, discount: 3.78, shipping: 4.9, total: 38.92 });
});

test("code promo inconnu ne plante jamais : ignoré ou refusé par ValidationError", () => {
  let result;
  try {
    result = checkout([{ id: "cafe-bio", qty: 2 }], "CODEINCONNU");
  } catch (err) {
    assert.ok(err instanceof ValidationError, `erreur inattendue (plantage serveur) : ${err && err.name}: ${err && err.message}`);
    return;
  }
  assert.equal(result.discount, 0);
  assert.equal(result.subtotal, 37.8);
});
