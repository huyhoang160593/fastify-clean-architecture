import type { Category } from "@core/entities/index.ts";
import type { IGenericRepository } from "../generic-repository.interface.ts";

export interface ICategoriesRepository extends IGenericRepository<Category> {}