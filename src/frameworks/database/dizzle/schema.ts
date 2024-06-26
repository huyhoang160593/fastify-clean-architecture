import {
	pgTable,
	timestamp,
	uuid,
	boolean,
	integer,
	real,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable(
	"categories",
	generateTable({
		name: varchar("name").notNull(),
		description: varchar("description"),
		image_url: varchar("image"),
	}),
);

export const products = pgTable(
	"products",
	generateTable({
		name: varchar("name").notNull(),
		description: varchar("description"),
		image_url: varchar("image"),
		lock_buy: boolean("lock_buy").default(false),
		remain: integer("remain").default(0),
		price: real("price").default(0.0),
	}),
);

export const categories_products = pgTable(
	"categories_products",
	generateTable({
		category_id: uuid("category_id")
			.references(() => categories.id)
			.notNull(),
		product_id: uuid("product_id")
			.references(() => products.id)
			.notNull(),
	}),
);

export const privilege = pgTable("privilege", {
	code: varchar("code").notNull().unique().primaryKey(),
	description: varchar("description"),
});

export const users = pgTable(
	"users",
	generateTable({
		privilege_code: varchar("privilege_code").references(() => privilege.code),
		name: varchar("name").notNull(),
		email: varchar("email").notNull(),
    avatar_url: varchar("avatar_url"),
		password_hash: varchar("password_hash").notNull(),
		phone_number: varchar("phone_number").notNull(),
		address: varchar("address"),
	}),
);

export const orders = pgTable(
	"orders",
	generateTable({
		user_id: uuid("user_id")
			.references(() => users.id)
			.notNull(),
		seller_id: uuid("seller_id").references(() => users.id),
		custom_address: varchar("custom_address"),
		custom_phone_number: varchar("custom_phone_number"),
	}),
);

export const orders_products = pgTable(
	"orders_products",
	generateTable({
		order_id: uuid("order_id")
			.references(() => orders.id)
			.notNull(),
		product_id: uuid("product_id")
			.references(() => products.id)
			.notNull(),
		quantity: integer("quantity").default(1),
	}),
);

//#region Private helpers
function generateIdColumn() {
	return {
		id: uuid("id").defaultRandom().primaryKey(),
	};
}
function generateCreateUpdateColumns() {
	return {
		created_at: timestamp("created_at").defaultNow(),
		update_at: timestamp("update_at")
			.defaultNow()
			.$onUpdateFn(() => new Date()),
	};
}

function generateTable<T>(tableDefinitionObject: T) {
	return Object.assign(
		{},
		generateIdColumn(),
		tableDefinitionObject,
		generateCreateUpdateColumns(),
	);
}
//#endregion
