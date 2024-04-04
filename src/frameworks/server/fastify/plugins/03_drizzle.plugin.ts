import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@frameworks/database/dizzle/schema.ts";
import fp from "fastify-plugin";
import postgres from "postgres";

export default fp(async (server, _options) => {
	const queryClient = postgres({
		hostname: server.config.POSTGRES_HOSTNAME,
		port: server.config.POSTGRES_PORT,
		user: server.config.POSTGRES_USER,
		password: server.config.POSTGRES_PASSWORD,
		database: server.config.POSTGRES_DB,
	});

	const db = drizzle(queryClient, { schema });

	server.decorate("db", db);
	server.addHook("onClose", async (_server) => {
		await queryClient.end();
	});
});

declare module "fastify" {
	interface FastifyInstance {
		db: PostgresJsDatabase<typeof schema>;
	}
}
