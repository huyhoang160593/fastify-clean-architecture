import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import type { User } from "@core/entities/index.ts";
import type { FastifyRequest, FastifyReply } from "fastify";
import type { Static } from "@sinclair/typebox";
import type { ErrorResponseDto } from "@core/dtos/index.ts";

/**
 * `jwt` is JWT utils for Fastify, internally it uses fast-jwt.
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp(async (server) => {
	await server.register(jwt, {
		secret: server.config.JWT_ACCESS_SECRET,
		// namespace: "access",
	});

	await server.register(jwt, {
		secret: server.config.JWT_REFRESH_SECRET,
		namespace: "refresh",
	});
	server.decorate(
		"userAuthenticateHooks",
		async (request: FastifyRequest, reply: FastifyReply) =>
			authenticateHooks(request, reply),
	);
	server.decorate(
		"refreshAuthenticateHooks",
		async (request: FastifyRequest, reply: FastifyReply) =>
			authenticateHooks(request, reply, "refresh"),
	);
	server.decorate("checkUserPrivilegeHooks", checkUserPrivilegeHooks);
});

async function authenticateHooks(
	request: FastifyRequest,
	reply: FastifyReply,
	verifyContext: "access" | "refresh" = "access",
) {
	try {
		switch (verifyContext) {
			case "access":
				await request.jwtVerify();
				break;
			case "refresh":
				await request.refreshJwtVerify();
				break;
			default:
				throw new Error(
					"There is no context provide, please make sure you have set verifyContext",
				);
		}
	} catch (error) {
		if (error instanceof Error) {
			return reply.status(401).send({
				success: false,
				reason: {
					message: error.message,
				},
			} satisfies Omit<Static<typeof ErrorResponseDto>, "statusCode">);
		}
		return reply.status(500).send({
			success: false,
			reason: {
				message: "Unknown Error",
			},
		} satisfies Omit<Static<typeof ErrorResponseDto>, "statusCode">);
	}
}

function checkUserPrivilegeHooks(privilegeCodes: string[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const user = request.user;
		if (!user) {
			return reply.status(401).send({
				success: false,
				reason: {
					message: "Unauthorized",
				},
			} satisfies Omit<Static<typeof ErrorResponseDto>, "statusCode">);
		}
		const isUserNotAdmin = request.user.privilege_code !== "admin";
		const isUserNotHasPrivilege =
			privilegeCodes.length > 0 &&
			!privilegeCodes.includes(user.privilege_code ?? "");
		if (isUserNotAdmin && isUserNotHasPrivilege) {
			return reply.status(403).send({
				success: false,
				reason: {
					message: "Your access to this endpoint is denied",
				},
			});
		}
	};
}

declare module "@fastify/jwt" {
	interface JWT {
		refresh: Omit<JWT, "refresh">;
	}
	interface FastifyJWT {
		payload: { id: string; email: string; privilege_code: string | null }; // payload type is used for signing and verifying
		user: Pick<User, "id" | "email" | "privilege_code">; // user type is return type of `request.user` object
	}
}

declare module "fastify" {
	interface FastifyInstance {
		userAuthenticateHooks: (
			request: FastifyRequest,
			reply: FastifyReply,
		) => Promise<void>;
		refreshAuthenticateHooks: (
			request: FastifyRequest,
			reply: FastifyReply,
		) => Promise<void>;
		checkUserPrivilegeHooks: (
			privilegeCodes: string[],
		) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}

	interface FastifyRequest {
		refreshJwtVerify: FastifyRequest["jwtVerify"];
	}
}
