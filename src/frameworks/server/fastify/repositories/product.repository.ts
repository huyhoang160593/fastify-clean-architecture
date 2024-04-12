import type { Product } from "@core/entities/index.ts";
import { GenericRepository } from "./index.ts";
import { products } from "@frameworks/database/dizzle/schema.ts";
import type { FastifyInstance } from "fastify";

export class ProductsRepository extends GenericRepository<
	Product,
	typeof products
> {
	constructor(db: FastifyInstance["db"]) {
		super(db, products);
	}
}
