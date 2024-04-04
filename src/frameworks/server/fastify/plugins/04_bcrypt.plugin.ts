import fp from "fastify-plugin";
import bcrypt from "fastify-bcrypt";

/**
 * `fastify-bcrypt` is a bcrypt hash generator and checker
 *
 * @see https://github.com/beliven-it/fastify-bcrypt
 */
export default fp(async (server) => {
	void server.register(bcrypt.default, {
		saltWorkFactor: server.config.SALT_ROUND,
	});
});
