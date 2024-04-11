import type { Category } from "@core/entities/index.ts";
import type { IDataServices } from "@core/interfaces/index.ts";

export class CategoryUseCase {
  constructor(private dataServices: IDataServices) {}

  async getCategories() {
    return this.dataServices.category.findAll();
  }

  async getCategoryById(id: string) {
    return this.dataServices.category.findById(id);
  }

  async createCategory(newCategory: Partial<Category>) {
    return this.dataServices.category.create(newCategory);
  }

  async updateCategory(id: string, newCategory: Partial<Category>) {
    return this.dataServices.category.update(id, newCategory);
  }

  async deleteCategory(id: string) {
    return this.dataServices.category.delete(id);
  }
}