export interface Product {
	id: string;
	name: string;
	description: string | null;
	image_url: string | null;
	lock_buy: boolean;
	remain: number;
	price: number;
	created_at?: Date | null;
	update_at?: Date | null;
}
