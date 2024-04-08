import type { IDataServices } from "@core/interfaces/index.ts";

export class UserUseCase {
	constructor(private dataServices: IDataServices) {}

	async login(email: string, password: string) {
		return this.dataServices.users.login(email, password);
	}

	async register(
		email: string,
		password: string,
		name: string,
		phoneNumber: string,
	) {
		return this.dataServices.users.register(email, password, name, phoneNumber);
	}

	async refreshSession(id: string, email: string) {
		return this.dataServices.users.refreshSession(id, email);
	}
}
