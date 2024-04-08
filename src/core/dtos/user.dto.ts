import { type Static, Type } from "@sinclair/typebox";
import { ResponseDto } from "./index.ts";
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

export const RefreshTokenDto = Type.Object({
  id: Type.String(),
	email: Type.String(),
})

export type LoginDtoType = Static<typeof LoginDto>;
export type RegisterDtoType = Static<typeof RegisterDto>;
export type RefreshTokenDtoType = Static<typeof RefreshTokenDto>;

//#endregion

//#region output
export const AuthenSessionDto = Type.Object({
	id: Type.String(),
	name: Type.Union([Type.String(), Type.Null()]),
	accessToken: Type.String(),
	refreshToken: Type.String(),
});

export const LoginResponseDto = ResponseDto<AuthenSessionDtoType, typeof AuthenSessionDto>();
export const RegisterResponseDto = ResponseDto<AuthenSessionDtoType, typeof AuthenSessionDto>();
export const RefreshTokenResponseDto = ResponseDto<AuthenSessionDtoType, typeof AuthenSessionDto>();

export type AuthenSessionDtoType = Static<typeof AuthenSessionDto> extends IAuthenSession ? IAuthenSession : never;
export type LoginResponseDtoType = Static<typeof LoginResponseDto>;
export type RegisterResponseDtoType = Static<typeof RegisterResponseDto>;
export type RefreshTokenResponseDtoType = Static<typeof RefreshTokenResponseDto>;
//#endregion
