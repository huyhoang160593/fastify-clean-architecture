import { ErrorResponseDto, SuccessResponseDto } from "@core/dtos/index.ts";
import {
	GetAllProductsResponseDto,
	type GetProductByIdDtoType,
	GetProductByIdResponseDto,
	type GetAllProductsResponseDtoType,
	type GetProductByIdResponseDtoType,
	type CreateProductDtoType,
	type CreateProductIdResponseDtoType,
	CreateProductIdResponseDto,
	type UpdateProductDtoType,
	type UpdateProductResponseDtoType,
	type ProductDtoType,
	UpdateProductResponseDto,
	type DeleteProductByIdResponseDtoType,
	DeleteProductByIdResponseDto,
} from "@core/dtos/product.dto.ts";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import type { ProductUseCase } from "@use-cases/product/index.ts";

export class ProductController {
	constructor(private productUseCase: ProductUseCase) {}

	async getAllProducts(): Promise<GetAllProductsResponseDtoType> {
		try {
			const products = await this.productUseCase.getProducts();
			const successResponse = Value.Create(
				Type.Extract(GetAllProductsResponseDto, SuccessResponseDto()),
			);
			successResponse.data = products;
			return successResponse;
		} catch (error) {
			// report and log error
			const errorResponse = Value.Create(ErrorResponseDto);
			if (error instanceof Error) {
				errorResponse.reason = {
					message: error.message,
				};
			}
			return errorResponse;
		}
	}

	async getProductById({
		id,
	}: GetProductByIdDtoType): Promise<GetProductByIdResponseDtoType> {
		try {
			const product = await this.productUseCase.getProductById(id);
			const successResponse = Value.Create(
				Type.Extract(GetProductByIdResponseDto, SuccessResponseDto()),
			);
			successResponse.data = product;
			return successResponse;
		} catch (error) {
			// report and log error
			const errorResponse = Value.Create(ErrorResponseDto);
			if (error instanceof Error) {
				errorResponse.reason = {
					message: error.message,
				};
			}
			return errorResponse;
		}
	}

	async createProduct(
		newProductInput: CreateProductDtoType,
	): Promise<CreateProductIdResponseDtoType> {
		try {
			const product = await this.productUseCase.createProduct(newProductInput);
			const successResponse = Value.Create(
				Type.Extract(CreateProductIdResponseDto, SuccessResponseDto()),
			);
			successResponse.data = product;
			return successResponse;
		} catch (error) {
			// report and log error
			const errorResponse = Value.Create(ErrorResponseDto);
			if (error instanceof Error) {
				errorResponse.reason = {
					message: error.message,
				};
			}
			return errorResponse;
		}
	}

	async updateProduct(
		id: ProductDtoType["id"],
		updateProductInput: UpdateProductDtoType,
	): Promise<UpdateProductResponseDtoType> {
		try {
			const product = await this.productUseCase.updateProduct(
				id,
				updateProductInput,
			);
			const successResponse = Value.Create(
				Type.Extract(UpdateProductResponseDto, SuccessResponseDto()),
			);
			successResponse.data = product;
			return successResponse;
		} catch (error) {
			// report and log error
			const errorResponse = Value.Create(ErrorResponseDto);
			if (error instanceof Error) {
				errorResponse.reason = {
					message: error.message,
				};
			}
			return errorResponse;
		}
	}

	async deleteProduct(
		id: ProductDtoType["id"],
	): Promise<DeleteProductByIdResponseDtoType> {
		try {
			await this.productUseCase.deleteProduct(id);
			const successResponse = Value.Create(
				Type.Extract(DeleteProductByIdResponseDto, SuccessResponseDto()),
			);
			return successResponse;
		} catch (error) {
			// report and log error
			const errorResponse = Value.Create(ErrorResponseDto);
			if (error instanceof Error) {
				errorResponse.reason = {
					message: error.message,
				};
			}
			return errorResponse;
		}
	}
}
