import type { IGenericRepository } from "@core/interfaces/index.ts";
import {
	eq,
} from "drizzle-orm";
import type {
	PgColumn,
	PgTableWithColumns,
} from "drizzle-orm/pg-core";
import type { FastifyInstance } from "fastify";

export class GenericRepository<T, U extends string>
	implements IGenericRepository<T>
{
	constructor(
		private db: FastifyInstance["db"],
		private entity: PgTableWithColumns<{
			schema: undefined;
			columns: {
				id: PgColumn<
					{
						name: "id";
						tableName: U;
						dataType: "string";
						columnType: "PgUUID";
						data: string;
						driverParam: string;
						notNull: true;
						hasDefault: true;
						enumValues: undefined;
						baseColumn: never;
					},
					// biome-ignore lint/complexity/noBannedTypes: <explanation>
					{},
					// biome-ignore lint/complexity/noBannedTypes: <explanation>
					{}
				>;
			};
			dialect: "pg";
			name: U;
		}>,
	) {}
	async create(data: Partial<T>) {
		return (await this.db.insert(this.entity).values(data).returning()) as T;
	}
	async update(id: string, data: Partial<T>) {
		return (await this.db
			.update(this.entity)
			.set(data)
			.where(eq(this.entity.id, id))
			.returning()) as T;
	}
	async delete(id: string): Promise<void> {
		await this.db.delete(this.entity).where(eq(this.entity.id, id));
	}
	async findById(id: string): Promise<T> {
		const results = await this.db
			.select()
			.from(this.entity)
			.where(eq(this.entity.id, id));
		if (results.length === 0) {
			throw new Error(`Not found entity with id ${id}`);
		}
		return results[0] as T;
	}
	async findAll(): Promise<T[]> {
		return (await this.db.select().from(this.entity)) as T[];
	}
}
