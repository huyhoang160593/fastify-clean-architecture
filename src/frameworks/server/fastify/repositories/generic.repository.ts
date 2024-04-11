import type { IGenericRepository } from "@core/interfaces/index.ts";
import { eq } from "drizzle-orm";
import type { PgColumn, PgTableWithColumns } from "drizzle-orm/pg-core";
import type { FastifyInstance } from "fastify";

export class GenericRepository<
	T,
	U extends GenericPGTable,
> implements IGenericRepository<T>
{
	constructor(
		protected db: FastifyInstance["db"],
		protected entity: U,
	) {}
	async create(data: Partial<T>) {
		const result = (await this.db
			.insert(this.entity)
			// biome-ignore lint/suspicious/noExplicitAny: we need some hack for passing data to insert to satisfy the generic type
			.values([data as any])
			.returning()) as T[];
		return result[0];
	}
	async update(id: string, data: Partial<T>) {
		const result = (await this.db
			.update(this.entity)
			// biome-ignore lint/suspicious/noExplicitAny: we need some hack for passing data to update to satisfy the generic type
			.set(data as any)
			.where(eq(this.entity.id, id))
			.returning()) as T[];
		return result[0];
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

type GenericPGTable = PgTableWithColumns<{
	schema: undefined;
	columns: {
		id: PgColumn<
			{
				name: "id";
				tableName: string;
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
	name: string;
}>;
