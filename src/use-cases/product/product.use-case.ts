import type { Product } from "@core/entities/index.ts";
import type { IDataServices } from "@core/interfaces/index.ts";

export class ProductUseCase {
	constructor(private dataServices: IDataServices) {}

	async getProducts() {
		return this.dataServices.product.findAll();
	}

	async getProductById(id: string) {
		return this.dataServices.product.findById(id);
	}

  async createProduct(newProduct: Partial<Product>) {
    return this.dataServices.product.create(newProduct);
  }

  async updateProduct(id: string, newProduct: Partial<Product>) {
    return this.dataServices.product.update(id, newProduct);
  }

  async deleteProduct(id: string) {
    return this.dataServices.product.delete(id);
  }
}
