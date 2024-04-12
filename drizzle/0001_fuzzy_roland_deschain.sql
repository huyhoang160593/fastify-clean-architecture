ALTER TABLE "categories_products" DROP CONSTRAINT "categories_products_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_privilege_code_privilege_code_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders_products" DROP CONSTRAINT "orders_products_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" DROP DEFAULT;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_products" ADD CONSTRAINT "categories_products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_privilege_code_privilege_code_fk" FOREIGN KEY ("privilege_code") REFERENCES "privilege"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
