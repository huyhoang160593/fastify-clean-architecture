import type { Author, Genre } from "./index.ts";

export interface Book {
	id: string | null;
	title: string;
	description: string;
	genre?: Genre;
	author?: Author;
	publishDate?: Date;
}
