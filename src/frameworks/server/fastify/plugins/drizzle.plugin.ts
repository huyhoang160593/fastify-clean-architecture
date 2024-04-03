import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@frameworks/database/dizzle/schema.ts"
import { generateQueryClient } from "@frameworks/database/client.database.ts";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const drizzlePlugin: FastifyPluginAsync = fp(async (server, _options) => {
	const queryClient = generateQueryClient({
		hostname: server.config.POSTGRES_HOSTNAME,
		port: server.config.POSTGRES_PORT,
		user: server.config.POSTGRES_USER,
		password: server.config.POSTGRES_PASSWORD,
		database: server.config.POSTGRES_DB,
	});

	const db = drizzle(queryClient, { schema });
	server.decorate('db', db);
	server.addHook('onClose', async (_server) => {
		await queryClient.end();
	});
});

export default drizzlePlugin;

declare module 'fastify' {
	interface FastifyInstance {
		db: PostgresJsDatabase<typeof schema>;
	}
}