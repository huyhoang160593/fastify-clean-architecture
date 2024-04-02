import type { IDataServices } from "@core/interfaces/index.ts";

export class UserUseCase {
	constructor(private dataServices: IDataServices) {}

	async login(email: string, password: string) {
		try {
			const userSession = await this.dataServices.users.login(email, password);
			return userSession;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
