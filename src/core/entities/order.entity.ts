export interface Order {
	id: string;
	user_id: string;
	seller_id: string | null;
	custom_address: string | null;
	custom_phone_number: string | null;
	created_at?: Date | null;
	update_at?: Date | null;
}
