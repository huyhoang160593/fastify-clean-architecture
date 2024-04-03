export interface IAuthenticationRepository {
	login(email: string, password: string): Promise<IAuthenSession>;
	register(
		email: string,
		password: string,
		name: string,
		phoneNumber: string,
	): Promise<IAuthenSession>;
	refreshSession(refreshToken: string): Promise<IAuthenSession>;
}

export interface IAuthenSession {
	id: string;
	name: string;
	accessToken: string;
	refreshToken: string;
}
