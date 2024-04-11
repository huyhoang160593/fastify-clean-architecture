import type { CategoryController } from "@controllers/index.ts";
import { CONTAINER_KEYS } from "@core/constants/index.ts";
import {
	CategoriesDto,
	CategoryByIdParamsDto,
	CategoryDto,
	CreateCategoryDto,
	UpdateCategoryDto,
} from "@core/dtos/category.dto.ts";
import {
	ErrorResponseDto,
	OmitStatusCodeDto,
	SuccessResponseDto,
} from "@core/dtos/index.ts";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { controllerResponseGenerate } from "../../misc/controller-response-generate.ts";

const categoryRouter: FastifyPluginAsyncTypebox = async (server, _opts) => {
	const categoryController = server.container.get<CategoryController>(
		CONTAINER_KEYS.controller.category,
	);
	const CATEGORY_TAG = "Category";

	server.get(
		"/",
		{
			schema: {
				tags: [CATEGORY_TAG],
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(CategoriesDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(_request, reply) =>
			controllerResponseGenerate(
				categoryController,
				"getAllCategories",
				[],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);

	server.get(
		"/:id",
		{
			schema: {
				tags: [CATEGORY_TAG],
				params: CategoryByIdParamsDto,
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(CategoryDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(request, reply) =>
			controllerResponseGenerate(
				categoryController,
				"getCategoryById",
				[{ id: request.params.id }],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);

	server.post(
		"/",
		{
			schema: {
				tags: [CATEGORY_TAG],
				body: CreateCategoryDto,
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(CategoryDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(request, reply) =>
			controllerResponseGenerate(
				categoryController,
				"createCategory",
				[request.body],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);

	server.put(
		"/:id",
		{
			schema: {
				tags: [CATEGORY_TAG],
				params: CategoryByIdParamsDto,
				body: UpdateCategoryDto,
				response: {
					200: OmitStatusCodeDto(SuccessResponseDto(CategoryDto)),
					400: OmitStatusCodeDto(ErrorResponseDto),
				},
			},
		},
		(request, reply) =>
			controllerResponseGenerate(
				categoryController,
				"updateCategory",
				[request.params.id, request.body],
				({ statusCode, ...responseBody }) =>
					reply.status(statusCode).send(responseBody),
			),
	);
  server.delete(
    "/:id",
    {
      schema: {
        tags: [CATEGORY_TAG],
        params: CategoryByIdParamsDto,
        response: {
          200: OmitStatusCodeDto(SuccessResponseDto()),
          400: OmitStatusCodeDto(ErrorResponseDto),
        }
      }
    },
    (request, reply) =>
      controllerResponseGenerate(
        categoryController,
        "deleteCategory",
        [request.params.id ],
        ({ statusCode, ...responseBody }) =>
          reply.status(statusCode).send(responseBody),
      ),
  )
};

export default categoryRouter;
