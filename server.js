import http from "node:http";
import fs from "node:fs";
import { checkout } from "./src/checkout.js";

const PORT = process.env.PORT || 3000;
const NIGHTSHIFT_URL = process.env.NIGHTSHIFT_URL || "http://localhost:4000/report";

// SDK de capture d'erreurs : envoie la stack trace + le contexte à NightShift
function reportError(err, context) {
  fetch(NIGHTSHIFT_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      service: "demo-shop",
      message: err.message,
      name: err.name,
      stack: err.stack,
      context,
      at: new Date().toISOString(),
    }),
  }).catch(() => {});
}

http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/checkout") {
    let body = "";
    for await (const chunk of req) body += chunk;
    const payload = JSON.parse(body || "{}");
    try {
      const result = checkout(payload.items, payload.coupon);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (err) {
      reportError(err, { route: "POST /api/checkout", payload });
      res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Une erreur est survenue, nos équipes sont prévenues." }));
    }
    return;
  }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(fs.readFileSync(new URL("./public/index.html", import.meta.url)));
}).listen(PORT, () => console.log(`demo-shop sur http://localhost:${PORT}`));
