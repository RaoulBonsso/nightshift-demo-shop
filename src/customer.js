import { ValidationError } from "./errors.js";

// L'e-mail est OPTIONNEL (commande en invité) : absent, null ou vide => chaîne vide (pas d'erreur).
// Une valeur fournie qui n'est pas une chaîne est une entrée invalide => ValidationError (400).
export function normalizeEmail(email) {
  if (email === undefined || email === null) return "";
  if (typeof email !== "string") {
    throw new ValidationError("L'e-mail doit être une chaîne de caractères");
  }
  return email.trim().toLowerCase();
}

// Destinataire du reçu : null si aucun e-mail (commande validée, aucun reçu envoyé).
export function receiptRecipient(email) {
  const normalized = normalizeEmail(email);
  return normalized === "" ? null : normalized;
}
