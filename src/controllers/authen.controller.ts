import {
	ErrorResponseDto,
	LoginResponseDto,
	type RefreshTokenDtoType,
	type RefreshTokenResponseDtoType,
	RegisterResponseDto,
	type RegisterResponseDtoType,
	SuccessResponseDto,
	type LoginDtoType,
	type LoginResponseDtoType,
	type RegisterDtoType,
} from "@core/dtos/index.ts";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import type { UserUseCase } from "@use-cases/user/index.ts";

export class AuthenController {
	constructor(private userUseCase: UserUseCase) {}

	async login({
		email,
		password,
	}: LoginDtoType): Promise<LoginResponseDtoType> {
		try {
			const userSession = await this.userUseCase.login(email, password);
			const successResponse = Value.Create(
				Type.Extract(LoginResponseDto, SuccessResponseDto()),
			);
			successResponse.data = userSession;
			return successResponse;
		} catch (error) {
			// report and log error
			const errorResponse = Value.Create(ErrorResponseDto);
      if (error instanceof Error) {
        errorResponse.reason = {
          message: error.message,
        }
      }
			return errorResponse;
		}
	}

	async register({
		email,
		password,
		name,
		phoneNumber,
	}: RegisterDtoType): Promise<RegisterResponseDtoType> {
		try {
			const userSession = await this.userUseCase.register(
				email,
				password,
				name,
				phoneNumber,
			);
			const successResponse = Value.Create(
				Type.Extract(RegisterResponseDto, SuccessResponseDto()),
			);
			successResponse.data = userSession;
			return successResponse;
		} catch (error) {
			// report and log error
			const errorResponse = Value.Create(ErrorResponseDto);
      if (error instanceof Error) {
        errorResponse.reason = {
          message: error.message,
        }
      }
			return errorResponse;
		}
	}

	async refreshSession({
		id,
		email,
	}: RefreshTokenDtoType): Promise<RefreshTokenResponseDtoType> {
		try {
			const userSession = await this.userUseCase.refreshSession(id, email);
			const successResponse = Value.Create(
				Type.Extract(RegisterResponseDto, SuccessResponseDto()),
			);
			successResponse.data = userSession;
			return successResponse;
		} catch (error) {
			// report and log error
			const errorResponse = Value.Create(ErrorResponseDto);
      if (error instanceof Error) {
        errorResponse.reason = {
          message: error.message,
        }
      }
			return errorResponse;
		}
	}
}
