import type { Book } from "@core/entities/index.ts"
import { Type, type Static }from "@sinclair/typebox"
//#region Inputs
export const CreateBookDtoType = Type.Object({
  title: Type.String(),
  authorId: Type.Any(),
  genreId: Type.Any(),
  publishDate: Type.Date()
})
export const UpdateBookDtoType = Type.Partial(CreateBookDtoType)

export type CreateBookDto = Static<typeof CreateBookDtoType>
export type UpdateBookDto = Static<typeof UpdateBookDtoType>

//#endregion

//#region Outputs
export const CreateBookResponseDtoType = Type.Object({
  success: Type.Boolean(),
  createdBook: Type.Union([Type.Unsafe<Book>(Type.Unknown()), Type.Null()])
})

export type CreateBookResponseDto = Static<typeof CreateBookResponseDtoType>
//#endregion