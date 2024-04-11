import type { Category } from "@core/entities/index.ts";
import { Type, type Static } from "@sinclair/typebox";
import { ResponseDto } from "./index.ts";

export const CategoryDto = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.Union([Type.String(), Type.Null()]),
  image_url: Type.Union([Type.String(), Type.Null()]),
});
export type CategoryDtoType = Static<typeof CategoryDto> extends Category ? Category : never;
//#region Input
export const CategoryByIdParamsDto = Type.Pick(CategoryDto, ["id"]);
export const CreateCategoryDto = Type.Partial(Type.Omit(CategoryDto, ["id"]));
export const UpdateCategoryDto = Type.Partial(Type.Omit(CategoryDto, ["id"]));
export const DeleteCategoryDto = Type.Pick(CategoryDto, ["id"]);

export type GetCategoryByIdDtoType = Static<typeof CategoryByIdParamsDto>;
export type CreateCategoryDtoType = Static<typeof CreateCategoryDto>;
export type UpdateCategoryDtoType = Static<typeof UpdateCategoryDto>;
export type DeleteCategoryDtoType = Static<typeof DeleteCategoryDto>;
//#endregion

//#region Output
export const CategoriesDto = Type.Array(CategoryDto);

export const GetAllCategoriesResponseDto = ResponseDto<
  CategoryDtoType[],
  typeof CategoriesDto
>();
export const GetCategoryByIdResponseDto = ResponseDto<
  CategoryDtoType,
  typeof CategoryDto
>();
export const CreateCategoryResponseDto = ResponseDto<
  CategoryDtoType,
  typeof CategoryDto
>();
export const UpdateCategoryByIdResponseDto = ResponseDto<
  CategoryDtoType,
  typeof CategoryDto
>();
export const DeleteCategoryByIdResponseDto = ResponseDto<
  undefined,
  ReturnType<typeof Type.Undefined>
>();

export type GetAllCategoriesResponseDtoType = Static<
  typeof GetAllCategoriesResponseDto
>;
export type GetCategoryByIdResponseDtoType = Static<
  typeof GetCategoryByIdResponseDto
>;
export type CreateCategoryResponseDtoType = Static<
  typeof CreateCategoryResponseDto
>;
export type UpdateCategoryByIdResponseDtoType = Static<
  typeof UpdateCategoryByIdResponseDto
>;
export type DeleteCategoryByIdResponseDtoType = Static<
  typeof DeleteCategoryByIdResponseDto
>;
//#endregion