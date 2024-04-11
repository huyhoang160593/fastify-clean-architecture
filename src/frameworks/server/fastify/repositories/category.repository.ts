import type { Category } from "@core/entities/index.ts";
import { GenericRepository } from "./generic.repository.ts";
import type { FastifyInstance } from "fastify";
import { categories } from "@frameworks/database/dizzle/schema.ts";

export class CategoriesRepository
  extends GenericRepository<Category, typeof categories>
{
  constructor(db: FastifyInstance["db"]) {
    super(db, categories);
  }
}