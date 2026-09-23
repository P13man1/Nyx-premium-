import { getSql, ensureSchema, readBody } from "./_db.js";

export default async function handler(req, res) {
  const sql = getSql();
  // Never break the UI: with no DB configured, report zeros.
  if (!sql) return res.status(200).json({ visits: 0, plays: 0, config: false });

  try {
    await ensureSchema(sql);
    if (req.method === "POST") {
      const { type } = readBody(req);
      const name = type === "play" ? "plays" : "visits";
      await sql`
        INSERT INTO counters (name, value) VALUES (${name}, 1)
        ON CONFLICT (name) DO UPDATE SET value = counters.value + 1`;
    }
    const rows = await sql`SELECT name, value FROM counters`;
    const out = { visits: 0, plays: 0 };
    for (const r of rows) out[r.name] = Number(r.value);
    return res.status(200).json(out);
  } catch (e) {
    return res.status(200).json({ visits: 0, plays: 0 });
  }
}
