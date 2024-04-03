import type { Author, Book, Genre } from "@core/entities/index.ts";
import type { IGenericRepository } from "./generic-repository.interface.ts";
import type { IAuthenticationRepository } from "./repositories/authentication-repository.interface.ts";

export interface IDataServices {
	users: IAuthenticationRepository;
	// authors: IGenericRepository<Author>;
	// books: IGenericRepository<Book>;
	// genres: IGenericRepository<Genre>;
}
