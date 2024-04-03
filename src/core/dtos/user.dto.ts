import { type Static, Type } from "@sinclair/typebox";
import { ResponseDtoType } from "./index.ts";
import type { IAuthenSession } from "@core/interfaces/index.ts";

//#region Inputs
export const LoginDto = Type.Object({
	email: Type.String(),
	password: Type.String(),
});

export type LoginDtoType = Static<typeof LoginDto>;
//#endregion

//#region output
export const LoginResponseDto = ResponseDtoType<IAuthenSession>();

export type LoginResponseDtoType = Static<typeof LoginResponseDto>;
//#endregion
