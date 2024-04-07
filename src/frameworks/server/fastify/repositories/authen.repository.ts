import type { User } from "@core/entities/index.ts";
import type {
	IAuthenSession,
	IAuthenticationRepository,
} from "@core/interfaces/index.ts";
import type { JWT } from "@fastify/jwt";
import { users } from "@frameworks/database/dizzle/schema.ts";
import { and, eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";

export class AuthenRepository implements IAuthenticationRepository {
	constructor(
		private db: FastifyInstance["db"],
		private bcrypt: FastifyInstance["bcrypt"],
		private jwtSign: {
			access: JWT['sign'];
			refresh: JWT['sign'];
		},
	) {}

	async login(email: string, password: string): Promise<IAuthenSession> {
		const foundUser = await this.db.query.users.findFirst({
			where: eq(users.email, email),
		});
		if (!foundUser) {
			throw new Error("User not found");
		}

		const isPasswordMatch = await this.bcrypt.compare(
			password,
			foundUser.password_hash,
		);

		if (!isPasswordMatch) {
			throw new Error("Wrong password");
		}
		return {
			id: foundUser.id,
			name: foundUser.name,
			...this.generateTokens(foundUser.id, foundUser.email),
		};
	}
	async register(
		email: string,
		password: string,
		name: string,
		phoneNumber: string,
	): Promise<IAuthenSession> {
		const foundUser = await this.db.query.users.findFirst({
			where: eq(users.email, email),
		});
		if (foundUser) {
			throw new Error("User with this email already exists");
		}
		const passwordHash = await this.bcrypt.hash(password);
		const newUser = await this.db
			.insert(users)
			.values({
				email,
				name,
				password_hash: passwordHash,
				phone_number: phoneNumber,
			})
			.returning();

		return {
			id: newUser[0].id,
			name: newUser[0].name,
			...this.generateTokens(newUser[0].id, newUser[0].email),
		};
	}
	async refreshSession(id: string, email: string): Promise<IAuthenSession> {
		const foundUser = await this.db.query.users.findFirst({
			where: and(eq(users.id, id), eq(users.email, email)),
		});
		if (!foundUser) {
			throw new Error(`User with id ${id} and email ${email} not found`);
		}
		return {
			id: foundUser.id,
			name: foundUser.name,
			...this.generateTokens(foundUser.id, foundUser.email),
		};
	}

	private generateTokens(id: string, email: string) {
		const accessToken = this.jwtSign.access(
			{
				id,
				email,
			},
			{
				expiresIn: "1d",
			},
		);
		const refreshToken = this.jwtSign.refresh(
			{
				id,
				email,
			},
			{
				expiresIn: "7d",
			},
		);
		return {
			accessToken,
			refreshToken,
		};
	}
}
