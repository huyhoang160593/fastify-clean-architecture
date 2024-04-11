import {
	GetAllCategoriesResponseDto,
	type GetCategoryByIdDtoType,
	GetCategoryByIdResponseDto,
	type GetCategoryByIdResponseDtoType,
	SuccessResponseDto,
	type GetAllCategoriesResponseDtoType,
	type CreateCategoryDtoType,
	type CreateCategoryResponseDtoType,
	CreateCategoryResponseDto,
	type CategoryDtoType,
	type UpdateCategoryDtoType,
	type UpdateCategoryByIdResponseDtoType,
	UpdateCategoryByIdResponseDto,
  DeleteCategoryByIdResponseDto,
  type DeleteCategoryByIdResponseDtoType,
} from "@core/dtos/index.ts";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import type { CategoryUseCase } from "@use-cases/category/category.use-case.ts";
import { generateErrorResponse } from "src/misc/controller-helper.misc.ts";

export class CategoryController {
	constructor(private categoryUseCase: CategoryUseCase) {}

	async getAllCategories(): Promise<GetAllCategoriesResponseDtoType> {
		try {
			const categories = await this.categoryUseCase.getCategories();
			const successResponse = Value.Create(
				Type.Extract(GetAllCategoriesResponseDto, SuccessResponseDto()),
			);
			successResponse.data = categories;
			return successResponse;
		} catch (error) {
			// report and log error
			return generateErrorResponse(error);
		}
	}

	async getCategoryById({
		id,
	}: GetCategoryByIdDtoType): Promise<GetCategoryByIdResponseDtoType> {
		try {
			const category = await this.categoryUseCase.getCategoryById(id);
			const successResponse = Value.Create(
				Type.Extract(GetCategoryByIdResponseDto, SuccessResponseDto()),
			);
			successResponse.data = category;
			return successResponse;
		} catch (error) {
			// report and log error
			return generateErrorResponse(error);
		}
	}

	async createCategory(
		newCategory: CreateCategoryDtoType,
	): Promise<CreateCategoryResponseDtoType> {
		try {
			const product = await this.categoryUseCase.createCategory(newCategory);
			const successResponse = Value.Create(
				Type.Extract(CreateCategoryResponseDto, SuccessResponseDto()),
			);
			successResponse.data = product;
			return successResponse;
		} catch (error) {
			// report and log error
			return generateErrorResponse(error);
		}
	}

	async updateCategory(
		id: CategoryDtoType["id"],
		updateCategoryInput: UpdateCategoryDtoType,
	): Promise<UpdateCategoryByIdResponseDtoType> {
		try {
			const category = await this.categoryUseCase.updateCategory(
				id,
				updateCategoryInput,
			);
			const successResponse = Value.Create(
				Type.Extract(UpdateCategoryByIdResponseDto, SuccessResponseDto()),
			);
			successResponse.data = category;
			return successResponse;
		} catch (error) {
			return generateErrorResponse(error);
		}
	}

  async deleteCategory(id: CategoryDtoType["id"]): Promise<DeleteCategoryByIdResponseDtoType> {
    try {
      await this.categoryUseCase.deleteCategory(id);
      const successResponse = Value.Create(
        Type.Extract(DeleteCategoryByIdResponseDto, SuccessResponseDto()),
      );
      return successResponse;
    } catch (error) {
      return generateErrorResponse(error);
    }
  }
}
