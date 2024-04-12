import postgres from "postgres";
import {
	POSTGRES_DB,
	POSTGRES_HOSTNAME,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
} from "../env.config";
import * as schema from "../drizzle/schema";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";

const sql = postgres({
	host: POSTGRES_HOSTNAME,
	port: POSTGRES_PORT,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DB,
});
const db = drizzle(sql);

await privilegeSeeding(db);

async function privilegeSeeding(db: PostgresJsDatabase<Record<string, never>>) {
	return await db.insert(schema.privilege).values(privilegesSeedingData);
}

//#region SeederData
const privilegesSeedingData: typeof schema.privilege.$inferInsert[] = [
	{
		code: "admin",
		description: "Admin privilege",
	},
	{
		code: "user",
		description: "User privilege",
	},
	{
		code: "seller",
		description: "Seller privilege",
	},
];
//#endregion
