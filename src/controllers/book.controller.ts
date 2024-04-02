import type { CreateBookDto, CreateBookResponseDto } from "@core/dtos/index.ts";
import type {
	BookFactoryBuilder,
	BookUseCase,
} from "src/use-cases/book/index.ts";

export class BookController {
	constructor(
		private bookUseCase: BookUseCase,
		private bookFactoryBuilder: BookFactoryBuilder,
	) {}

	async createBook(bookDto: CreateBookDto) {
		const createBookResponse: CreateBookResponseDto = {
			success: false,
			createdBook: null,
		};
		try {
			const newBook = this.bookFactoryBuilder.createNewBook(bookDto);
			const createdBook = await this.bookUseCase.createBook(newBook);
			createBookResponse.success = true;
			createBookResponse.createdBook = createdBook;
		} catch (error) {
			// report and log error
		}
		return createBookResponse;
	}
}
