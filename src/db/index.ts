import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL env var is not defined");
}

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql });
