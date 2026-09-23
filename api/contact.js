import { getSql, ensureSchema, readBody, isEmail } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  const sql = getSql();
  if (!sql) return res.status(503).json({ error: "config" });

  const body = readBody(req);
  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || "").trim().toLowerCase().slice(0, 200);
  const message = String(body.message || "").trim().slice(0, 4000);
  if (!name || !isEmail(email) || !message)
    return res.status(400).json({ error: "invalid" });

  try {
    await ensureSchema(sql);
    await sql`INSERT INTO messages (name, email, message)
              VALUES (${name}, ${email}, ${message})`;
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "server" });
  }
}
