import type { ProductController } from "@controllers/index.ts";
import { CONTAINER_KEYS } from "@core/constants/di-keys.constants.ts";
import {
	ErrorResponseDto,
	OmitStatusCodeDto,
  SuccessResponseDto,
} from "@core/dtos/common.dto.ts";
import { ProductsDto } from "@core/dtos/index.ts";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { controllerResponseGenerate } from "../../misc/controller-response-generate.ts";

const productRouter: FastifyPluginAsyncTypebox = async (server, _opts) => {
	const productController = server.container.get<ProductController>(
		CONTAINER_KEYS.controller.product,
	);

	server.get(
		"/",
		{
			schema: {
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(ProductsDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(_request, reply) =>
			controllerResponseGenerate(
				productController,
				"getAllProducts",
				[],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);
};

export default productRouter;
