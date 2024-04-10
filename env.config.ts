import "dotenv/config";

export const {
	HOST,
	PORT,
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	POSTGRES_DB,
	POSTGRES_HOSTNAME,
	POSTGRES_PASSWORD,
	POSTGRES_PORT,
	POSTGRES_USER,
} = {
	HOST: parseString(process.env.HOST, "HOST"),
	PORT: parseInteger(process.env.PORT, "PORT"),
	JWT_ACCESS_SECRET: parseString(
		process.env.JWT_ACCESS_SECRET,
		"JWT_ACCESS_SECRET",
	),
	JWT_REFRESH_SECRET: parseString(
		process.env.JWT_REFRESH_SECRET,
		"JWT_REFRESH_SECRET",
	),
	POSTGRES_HOSTNAME: parseString(
		process.env.POSTGRES_HOSTNAME,
		"POSTGRES_HOSTNAME",
	),
	POSTGRES_PORT: parseInteger(process.env.POSTGRES_PORT, "POSTGRES_PORT"),
	POSTGRES_DB: parseString(process.env.POSTGRES_DB, "POSTGRES_DB"),
	POSTGRES_USER: parseString(process.env.POSTGRES_USER, "POSTGRES_USER"),
	POSTGRES_PASSWORD: parseString(
		process.env.POSTGRES_PASSWORD,
		"POSTGRES_PASSWORD",
	),
};

//#region Helper
function isString(text: unknown): text is string {
	return typeof text === "string" || text instanceof String;
}
export function parseString(text: unknown, fieldName = "text"): string {
	if (!text || !isString(text)) {
		throw new Error(`Incorrect or missing ${fieldName}`);
	}

	return text;
}

export function parseInteger(number: unknown, fieldName = "number"): number {
	if (!number || typeof number !== "string") {
		throw new Error(
			`${fieldName} is empty or is not a type that can be converted`,
		);
	}
	const parseResult = Number.parseInt(number);
	if (!Number.isFinite(parseResult)) {
		throw new Error(`Cannot parse ${fieldName} into integer`);
	}
	return parseResult;
}
//#endregion
