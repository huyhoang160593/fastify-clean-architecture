export interface User {
	id: string;
	name: string | null;
	created_at: Date | null;
	update_at: Date | null;
	privilege_code: string | null;
	email: string | null;
	password_hash: string | null;
	phone_number: string | null;
	address: string | null;
}
