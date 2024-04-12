import type { Product } from "@core/entities/index.ts";
import type { IGenericRepository } from "../generic-repository.interface.ts";

export interface IProductsRepository extends IGenericRepository<Product> {}