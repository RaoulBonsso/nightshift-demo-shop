import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeEmail } from "../src/customer.js";
import { ValidationError } from "../src/errors.js";

// Reproduit POST /api/checkout avec payload {"items":[{"id":"mug","qty":1}]} : aucun e-mail fourni.
// Une entrée utilisateur absente ne doit jamais provoquer un TypeError (500) : soit elle est
// tolérée (retour d'une chaîne), soit elle est refusée proprement via ValidationError (400).
function assertHandledGracefully(input) {
  let result;
  try {
    result = normalizeEmail(input);
  } catch (err) {
    assert.ok(
      err instanceof ValidationError,
      `normalizeEmail(${String(input)}) a levé ${err && err.name}: ${err && err.message} au lieu d'une ValidationError`
    );
    return;
  }
  assert.equal(typeof result, "string", `normalizeEmail(${String(input)}) doit renvoyer une chaîne ou lever ValidationError`);
}

test("checkout sans e-mail (undefined) : pas de TypeError, ValidationError ou valeur tolérée", () => {
  assertHandledGracefully(undefined);
});

test("checkout avec e-mail null : pas de TypeError", () => {
  assertHandledGracefully(null);
});

test("checkout avec e-mail non-chaîne (nombre) : pas de TypeError", () => {
  assertHandledGracefully(42);
});

test("un e-mail valide reste normalisé", () => {
  assert.equal(normalizeEmail("  Client@Exemple.FR "), "client@exemple.fr");
});
