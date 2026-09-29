import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeEmail } from "../src/customer.js";
import { ValidationError } from "../src/errors.js";

// Reproduit POST /api/checkout avec payload {"items":[{"id":"mug","qty":1}]} : aucun e-mail fourni.
// Une entrée absente ne doit jamais provoquer un TypeError (crash serveur) : soit elle est tolérée
// (chaîne normalisée), soit elle est refusée proprement via ValidationError (400).
function assertToleratedOrValidationError(value) {
  let result;
  try {
    result = normalizeEmail(value);
  } catch (err) {
    assert.ok(
      err instanceof ValidationError,
      `normalizeEmail(${String(value)}) doit lever ValidationError, pas ${err && err.name}: ${err && err.message}`
    );
    return;
  }
  assert.equal(typeof result, "string", `normalizeEmail(${String(value)}) doit renvoyer une chaîne si toléré`);
  assert.equal(result, result.trim().toLowerCase());
}

test("checkout sans e-mail dans le payload (undefined) ne plante pas le serveur", () => {
  const payload = { items: [{ id: "mug", qty: 1 }] };
  assertToleratedOrValidationError(payload.email);
});

test("e-mail null ou de type invalide : toléré ou ValidationError, jamais TypeError", () => {
  assertToleratedOrValidationError(null);
  assertToleratedOrValidationError(42);
  assertToleratedOrValidationError({});
});

test("un e-mail valide reste normalisé", () => {
  assert.equal(normalizeEmail("  Client@Exemple.FR "), "client@exemple.fr");
});
