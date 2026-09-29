import { ValidationError } from "./errors.js";

export function normalizeEmail(email) {
  if (typeof email !== "string") {
    throw new ValidationError("Adresse e-mail requise : une chaîne de caractères est attendue.");
  }
  return email.trim().toLowerCase();
}
