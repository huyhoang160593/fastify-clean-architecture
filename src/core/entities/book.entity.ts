import type { Author, Genre } from "./index.ts";

export interface Book {
	id: number;
	title: string;
	description: string;
	genre: Genre;
	author: Author;
}
