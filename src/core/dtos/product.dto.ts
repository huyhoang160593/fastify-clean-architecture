import { type ReturnType, type Static, Type } from "@sinclair/typebox";
import { ResponseDto } from "./common.dto.ts";
import type { Product } from "@core/entities/index.ts";

export const ProductDto = Type.Object({
	id: Type.String(),
	name: Type.String(),
	description: Type.Union([Type.String(), Type.Null()]),
	image_url: Type.Union([Type.String(), Type.Null()]),
	lock_buy: Type.Boolean(),
	remain: Type.Number(),
	price: Type.Number(),
});
export type ProductDtoType = Static<typeof ProductDto> extends Product ? Product : never;
//#region Input
export const ProductByIdParamsDto = Type.Pick(ProductDto, ["id"]);
export const CreateProductDto = Type.Partial(Type.Omit(ProductDto, ["id"]));
export const UpdateProductDto = Type.Partial(Type.Omit(ProductDto, ["id"]));
export const DeleteProductDto = Type.Pick(ProductDto, ["id"]);

export type GetProductByIdDtoType = Static<typeof ProductByIdParamsDto>;
export type CreateProductDtoType = Static<typeof CreateProductDto>;
export type UpdateProductDtoType = Static<typeof UpdateProductDto>;
export type DeleteProductDtoType = Static<typeof DeleteProductDto>;
//#endregion

//#region Output
export const ProductsDto = Type.Array(ProductDto);

export const GetAllProductsResponseDto = ResponseDto<
	ProductDtoType[],
	typeof ProductsDto
>();
export const GetProductByIdResponseDto = ResponseDto<
	ProductDtoType,
	typeof ProductDto
>();
export const CreateProductResponseDto = ResponseDto<
	ProductDtoType,
	typeof ProductDto
>();
export const UpdateProductByIdResponseDto = ResponseDto<
	ProductDtoType,
	typeof ProductDto
>();
export const DeleteProductByIdResponseDto = ResponseDto<
	undefined,
	ReturnType<typeof Type.Undefined>
>();

export type GetAllProductsResponseDtoType = Static<
	typeof GetAllProductsResponseDto
>;
export type GetProductByIdResponseDtoType = Static<
	typeof GetProductByIdResponseDto
>;
export type CreateProductResponseDtoType = Static<
	typeof CreateProductResponseDto
>;
export type UpdateProductByIdResponseDtoType = Static<
	typeof UpdateProductByIdResponseDto
>;
export type DeleteProductByIdResponseDtoType = Static<
	typeof DeleteProductByIdResponseDto
>;
//#endregion
