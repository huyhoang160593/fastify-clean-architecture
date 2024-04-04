import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
/**
 * `jwt` is JWT utils for Fastify, internally it uses fast-jwt.
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp(async (server) => {
	void server.register(jwt, {
		secret: server.config.JWT_SECRET,
	});
});
