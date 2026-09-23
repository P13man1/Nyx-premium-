import { getSql, ensureSchema, readBody, isEmail } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  const sql = getSql();
  if (!sql) return res.status(503).json({ error: "config" });

  const { email } = readBody(req);
  const clean = String(email || "").trim().toLowerCase();
  if (!isEmail(clean)) return res.status(400).json({ error: "email" });

  try {
    await ensureSchema(sql);
    const rows = await sql`
      INSERT INTO subscribers (email) VALUES (${clean})
      ON CONFLICT (email) DO NOTHING
      RETURNING id`;
    if (rows.length === 0) return res.status(409).json({ ok: true, duplicate: true });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "server" });
  }
}
