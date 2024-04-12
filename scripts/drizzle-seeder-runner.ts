import postgres from "postgres";
import {
	POSTGRES_DB,
	POSTGRES_HOSTNAME,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
} from "../env.config";
import * as schema from "../drizzle/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { privilegesSeedingData } from "./seederData/privilegesSeedingData";

const sql = postgres({
	host: POSTGRES_HOSTNAME,
	port: POSTGRES_PORT,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DB,
});
const db = drizzle(sql);

await db.insert(schema.privilege).values(privilegesSeedingData);
