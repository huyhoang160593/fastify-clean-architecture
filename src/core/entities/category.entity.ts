export interface Category {
	id: string;
	name: string;
	description: string | null;
	image: string | null;
	created_at?: Date | null;
	update_at?: Date | null;
}
