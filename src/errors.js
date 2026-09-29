// Erreur métier attendue (entrée invalide) : renvoyée en 400 au client, jamais remontée comme incident
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
