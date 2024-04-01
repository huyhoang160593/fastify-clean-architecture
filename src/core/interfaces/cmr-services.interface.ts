import type { Book } from "@core/entities/index.ts";

export interface ICrmServices {
  bookAdded(book: Book): Promise<boolean>
}