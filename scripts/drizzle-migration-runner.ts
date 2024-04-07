import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { envVariables } from "../src/configs/env.config";

const sql = postgres({
  host: envVariables.POSTGRES_HOSTNAME,
  port: envVariables.POSTGRES_PORT,
  user: envVariables.POSTGRES_USER,
  password: envVariables.POSTGRES_PASSWORD,
  database: envVariables.POSTGRES_DB,
})

const db = drizzle(sql);
await migrate(db, { migrationsFolder: "drizzle" });
await sql.end();