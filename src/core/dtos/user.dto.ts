import { type Static, Type } from "@sinclair/typebox";
import { ResponseDtoType } from "./index.ts";
import type { IAuthenSession } from "@core/interfaces/index.ts";

//#region Inputs
export const LoginDto = Type.Object({
	email: Type.String(),
	password: Type.String(),
});

export const RegisterDto = Type.Object({
  email: Type.String(),
  password: Type.String(),
  name: Type.String(),
  phoneNumber: Type.String(),
});

export type LoginDtoType = Static<typeof LoginDto>;
export type RegisterDtoType = Static<typeof RegisterDto>;
//#endregion

//#region output
export const LoginResponseDto = ResponseDtoType<IAuthenSession>();
export const RegisterResponseDto = ResponseDtoType<IAuthenSession>();

export type LoginResponseDtoType = Static<typeof LoginResponseDto>;
export type RegisterResponseDtoType = Static<typeof RegisterResponseDto>;
//#endregion
