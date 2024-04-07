import type { IDataServices } from "@core/interfaces/index.ts";

export class UserUseCase {
	constructor(private dataServices: IDataServices) {}

	async login(email: string, password: string) {
		return this.dataServices.users.login(email, password).catch((error) => {
			throw error;
		});
	}

	async register(
		email: string,
		password: string,
		name: string,
		phoneNumber: string,
	) {
		return this.dataServices.users
			.register(email, password, name, phoneNumber)
			.catch((error) => {
				throw error;
			});
	}

	async refreshSession(id: string, email: string) {
		return this.dataServices.users.refreshSession(id, email).catch((error) => {
			throw error;
		});
	}
}
