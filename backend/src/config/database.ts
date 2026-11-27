import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  ssl: env.DB_SSL ? { rejectUnauthorized: true } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 25000,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});
