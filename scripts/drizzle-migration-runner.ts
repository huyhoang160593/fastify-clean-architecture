import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import {
	POSTGRES_HOSTNAME,
	POSTGRES_PORT,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
} from "../env.config";

const sql = postgres({
	host: POSTGRES_HOSTNAME,
	port: POSTGRES_PORT,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DB,
});

const db = drizzle(sql);
await migrate(db, { migrationsFolder: "drizzle" });
await sql.end();
