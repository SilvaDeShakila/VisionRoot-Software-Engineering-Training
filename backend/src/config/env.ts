import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(5000),

  FRONTEND_URL: z.string().url().default("http://localhost:3000"),

  DB_HOST: z.string().min(1).default("localhost"),

  DB_PORT: z.coerce.number().int().positive().default(5432),

  DB_NAME: z.string().min(1).default("visionroot_db"),

  DB_USER: z.string().min(1).default("postgres"),

  DB_PASSWORD: z.string().min(1),

  DB_SSL: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration:");
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;