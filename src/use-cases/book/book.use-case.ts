import type { Book } from "@core/entities/index.ts";
import type { ICrmServices, IDataServices } from "@core/interfaces/index.ts";

export class BookUseCase {
	constructor(
		private dataServices: IDataServices,
		private crmServices: ICrmServices,
	) {}

	async createBook(book: Book): Promise<Book> {
		try {
			const createdBook = await this.dataServices.books.create(book);
			await this.crmServices.bookAdded(createdBook);
			return createdBook;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
