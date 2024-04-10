import type { ProductController } from "@controllers/index.ts";
import { CONTAINER_KEYS } from "@core/constants/di-keys.constants.ts";
import {
	ErrorResponseDto,
	OmitStatusCodeDto,
	SuccessResponseDto,
} from "@core/dtos/common.dto.ts";
import {
	CreateProductDto,
	ProductByIdParamsDto,
	ProductDto,
	ProductsDto,
	UpdateProductDto,
} from "@core/dtos/index.ts";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { controllerResponseGenerate } from "../../misc/controller-response-generate.ts";

const productRouter: FastifyPluginAsyncTypebox = async (server, _opts) => {
	const productController = server.container.get<ProductController>(
		CONTAINER_KEYS.controller.product,
	);
  const PRODUCT_TAG = "Product";

	server.get(
		"/",
		{
			schema: {
        tags: [PRODUCT_TAG],
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
	server.get(
		"/:id",
		{
			schema: {
        tags: [PRODUCT_TAG],
				params: ProductByIdParamsDto,
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(ProductDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(request, reply) =>
			controllerResponseGenerate(
				productController,
				"getProductById",
				[{ id: request.params.id }],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);

	server.post(
		"/",
		{
			schema: {
        tags: [PRODUCT_TAG],
				body: CreateProductDto,
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(ProductDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(request, reply) =>
			controllerResponseGenerate(
				productController,
				"createProduct",
				[request.body],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);
	server.put(
		"/:id",
		{
			schema: {
        tags: [PRODUCT_TAG],
				params: ProductByIdParamsDto,
				body: UpdateProductDto,
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(ProductDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(request, reply) =>
			controllerResponseGenerate(
				productController,
				"updateProduct",
				[request.params.id, request.body],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);
  server.delete(
    "/:id",
    {
      schema: {
        tags: [PRODUCT_TAG],
        params: ProductByIdParamsDto,
        response: {
          200: OmitStatusCodeDto(SuccessResponseDto()),
          400: OmitStatusCodeDto(ErrorResponseDto),
        }
      }
    },
    (request, reply) =>
      controllerResponseGenerate(
        productController,
        "deleteProduct",
        [request.params.id],
        ({ statusCode, ...responseBody }) =>
          reply.status(statusCode).send(responseBody),
      ),
  )
};

export default productRouter;
