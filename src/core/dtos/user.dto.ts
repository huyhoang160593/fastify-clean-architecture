import { type Static, Type } from "@sinclair/typebox";

//#region Inputs
export const LoginDtoType = Type.Object({
	email: Type.String(),
	password: Type.String(),
});

export type LoginDtoType = Static<typeof LoginDtoType>;
//#endregion
