import type { LoginDtoType, LoginResponseDtoType } from "@core/dtos/index.ts";
import type { UserUseCase } from "@use-cases/user/index.ts";

export class AuthenController {
	constructor(private userUseCase: UserUseCase) {}

	async login({ email, password }: LoginDtoType) {
		const loginResponse: LoginResponseDtoType = {
			success: false,
		};
		try {
			const userSession = await this.userUseCase.login(email, password);
			Object.assign(loginResponse, {
				success: true,
				data: userSession,
			} satisfies LoginResponseDtoType);
		} catch (error) {
			// report and log error
		}
		return loginResponse;
	}
}
