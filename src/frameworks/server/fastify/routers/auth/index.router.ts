import type { AuthenController } from "@controllers/index.ts";
import { CONTAINER_KEYS } from "@core/constants/di-keys.constants.ts";
import {
	ErrorResponseDto,
	LoginDto,
	LoginResponseDto,
	SuccessResponseDto,
} from "@core/dtos/index.ts";
import {
	Type,
	type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import fp from "fastify-plugin";

const authRouter: FastifyPluginAsyncTypebox = async (server, _opts) => {
	const userController = server.container.get<AuthenController>(
		CONTAINER_KEYS.controller.authen,
	);

	server.post(
		"/login",
		{
			schema: {
				body: LoginDto,
				response: {
					200: Type.Extract(LoginResponseDto, SuccessResponseDto()),
					400: Type.Extract(LoginResponseDto, ErrorResponseDto()),
				},
			},
		},
		async (request, reply) =>
			reply.send(await userController.login(request.body)),
	);
};

export default fp(authRouter);
