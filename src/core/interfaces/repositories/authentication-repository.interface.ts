import type { User } from "@core/entities/index.ts";

export interface IAuthenticationRepository {
	login(
		email: User["email"],
		password: User["password_hash"],
	): Promise<IAuthenSession>;
	register(
		email: User["email"],
		password: User["password_hash"],
		name: User["name"],
		phoneNumber: User["phone_number"],
	): Promise<IAuthenSession>;
	refreshSession(id: User["id"], email: User["email"]): Promise<IAuthenSession>;
}

export interface IAuthenSession {
	id: User["id"];
	name: User["name"];
	accessToken: string;
	refreshToken: string;
}
