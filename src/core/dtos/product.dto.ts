import { type ReturnType, type Static, Type } from "@sinclair/typebox";
import { ResponseDto } from "./common.dto.ts";

export const ProductDto = Type.Object({
	id: Type.String(),
	name: Type.String(),
	description: Type.Union([Type.String(), Type.Null()]),
	image_url: Type.Union([Type.String(), Type.Null()]),
	lock_buy: Type.Boolean(),
	remain: Type.Number(),
	price: Type.Number(),
});
export type ProductDtoType = Static<typeof ProductDto>;
//#region Input
export const ProductByIdParamsDto = Type.Pick(ProductDto, ["id"]);
export const CreateProductDto = Type.Partial(ProductDto);
export const UpdateProductDto = Type.Partial(ProductDto);
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
export const CreateProductIdResponseDto = ResponseDto<
	ProductDtoType,
	typeof ProductDto
>();
export const UpdateProductResponseDto = ResponseDto<
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
export type CreateProductIdResponseDtoType = Static<
	typeof CreateProductIdResponseDto
>;
export type UpdateProductResponseDtoType = Static<
	typeof UpdateProductResponseDto
>;
export type DeleteProductByIdResponseDtoType = Static<
	typeof DeleteProductByIdResponseDto
>;
//#endregion
