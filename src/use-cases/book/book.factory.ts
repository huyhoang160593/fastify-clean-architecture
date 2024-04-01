import type { CreateBookDto, UpdateBookDto } from "@core/dtos/index.ts";
import type { Book } from "@core/entities/index.ts";

export class BookFactoryBuilder {
	createNewBook(createBookDto: CreateBookDto): Book {
		const newBook: Book = Object.assign({}, {
			id: null,
			title: createBookDto.title,
			author: createBookDto.authorId,
			genre: createBookDto.genreId,
      publishDate: createBookDto.publishDate,
			description: "",
		} satisfies Partial<Book>);
		return newBook;
	}

	updateBook(updateBook: UpdateBookDto, currentBookId: Book['id']): Book {
		const updatedBook: Book = Object.assign({}, {
      id: currentBookId,
			title: updateBook.title ?? "",
			author: updateBook.authorId,
			genre: updateBook.genreId,
			publishDate: updateBook.publishDate,
			description: "",
		} satisfies Partial<Book>);
		return updatedBook;
	}
}
