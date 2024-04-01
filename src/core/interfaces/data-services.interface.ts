import type { Author, Book, Genre } from "@core/entities/index.ts";
import type { IGenericRepository } from "./generic-repository.interface.ts";

export interface IDataServices {
  authors: IGenericRepository<Author>;
  books: IGenericRepository<Book>;
  genres: IGenericRepository<Genre>;
}