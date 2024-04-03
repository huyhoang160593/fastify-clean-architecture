import { pgTable, uuid, varchar, timestamp, foreignKey, boolean, integer, real } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const categories = pgTable("categories", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name"),
	description: varchar("description"),
	image: varchar("image"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updateAt: timestamp("update_at", { mode: 'string' }).defaultNow(),
});

export const categoriesProducts = pgTable("categories_products", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	categoryId: uuid("category_id").references(() => categories.id),
	productId: uuid("product_id").references(() => products.id),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updateAt: timestamp("update_at", { mode: 'string' }).defaultNow(),
});

export const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	name: varchar("name"),
	description: varchar("description"),
	image: varchar("image"),
	lockBuy: boolean("lock_buy").default(false),
	remain: integer("remain").default(0),
	price: real("price"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updateAt: timestamp("update_at", { mode: 'string' }).defaultNow(),
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	privilegeCode: varchar("privilege_code").references(() => privilege.code),
	name: varchar("name"),
	email: varchar("email"),
	passwordHash: varchar("password_hash"),
	phone: varchar("phone"),
	address: varchar("address"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updateAt: timestamp("update_at", { mode: 'string' }).defaultNow(),
});

export const orders = pgTable("orders", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => users.id),
	sellerId: uuid("seller_id").references(() => users.id),
	customAddress: varchar("custom_address"),
	customPhoneNumber: varchar("custom_phone_number"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updateAt: timestamp("update_at", { mode: 'string' }).defaultNow(),
});

export const ordersProducts = pgTable("orders_products", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	orderId: uuid("order_id").notNull().references(() => orders.id),
	productId: uuid("product_id").notNull().references(() => products.id),
	quantity: integer("quantity").default(1),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updateAt: timestamp("update_at", { mode: 'string' }).defaultNow(),
});

export const privilege = pgTable("privilege", {
	code: varchar("code").primaryKey().notNull(),
	description: varchar("description"),
});