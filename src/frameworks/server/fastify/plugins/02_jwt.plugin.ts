import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import type { User } from "@core/entities/index.ts";
/**
 * `jwt` is JWT utils for Fastify, internally it uses fast-jwt.
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp(async (server) => {
	await server.register(jwt, {
		secret: server.config.JWT_SECRET,
	});

});

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string, email: string } // payload type is used for signing and verifying
    user: Pick<User, 'id' | 'email'>// user type is return type of `request.user` object
  }
}