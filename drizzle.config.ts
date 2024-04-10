import type { Config } from "drizzle-kit";
import {
	POSTGRES_HOSTNAME,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DB,
} from "./env.config";

export default {
	schema: ["./src/frameworks/database/dizzle/schema.ts", "./drizzle/schema.ts"],
	out: "./drizzle",
	driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		host: POSTGRES_HOSTNAME,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
		database: POSTGRES_DB,
	},
} satisfies Config;
