import { neon } from "@neondatabase/serverless";

// Returns a SQL tag bound to Neon, or null if DATABASE_URL isn't set yet.
export function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

let schemaReady = false;

export async function ensureSchema(sql) {
  if (schemaReady) return;
  await sql`CREATE TABLE IF NOT EXISTS subscribers (
    id serial PRIMARY KEY,
    email text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS messages (
    id serial PRIMARY KEY,
    name text,
    email text,
    message text,
    created_at timestamptz DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS counters (
    name text PRIMARY KEY,
    value bigint DEFAULT 0
  )`;
  schemaReady = true;
}

export function readBody(req) {
  const b = req.body;
  if (!b) return {};
  if (typeof b === "string") {
    try {
      return JSON.parse(b);
    } catch {
      return {};
    }
  }
  return b;
}

export function isEmail(v) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
}
