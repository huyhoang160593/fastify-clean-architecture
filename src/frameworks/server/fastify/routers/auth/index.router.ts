import type { AuthenController } from "@controllers/index.ts";
import { CONTAINER_KEYS } from "@core/constants/di-keys.constants.ts";
import {
	ErrorResponseDto,
	LoginDto,
	LoginResponseDto,
	RegisterDto,
	RegisterResponseDto,
	SuccessResponseDto,
} from "@core/dtos/index.ts";
import {
	Type,
	type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";

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

	server.post(
		"/register",
		{
			schema: {
				body: RegisterDto,
				response: {
					200: Type.Extract(RegisterResponseDto, SuccessResponseDto()),
					400: Type.Extract(RegisterResponseDto, ErrorResponseDto()),
				},
			},
		},
		async (request, reply) =>
			reply.send(await userController.register(request.body)),
	);
};

export default authRouter;
