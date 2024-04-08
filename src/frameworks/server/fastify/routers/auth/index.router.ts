import type { AuthenController } from "@controllers/index.ts";
import { CONTAINER_KEYS } from "@core/constants/di-keys.constants.ts";
import {
	AuthenSessionDto,
	ErrorResponseDto,
	LoginDto,
	OmitStatusCodeDto,
	RegisterDto,
	SuccessResponseDto,
} from "@core/dtos/index.ts";
import {
	Type,
	type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { controllerResponseGenerate } from "../../misc/controller-response-generate.ts";

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
					200: OmitStatusCodeDto(SuccessResponseDto(AuthenSessionDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(request, reply) => {
			return controllerResponseGenerate(
				userController,
				"login",
				[request.body],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			);
		},
	);

	server.post(
		"/register",
		{
			schema: {
				body: RegisterDto,
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(AuthenSessionDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		async (request, reply) =>
			controllerResponseGenerate(
				userController,
				"register",
				[request.body],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);

	server.post(
		"/refresh",
		{
			onRequest: [server.refreshAuthenticateHooks],
			schema: {
				body: Type.Object({}),
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(AuthenSessionDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
					401: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(request, reply) =>
			controllerResponseGenerate(
				userController,
				"refreshSession",
				[request.user],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);
};

export default authRouter;
