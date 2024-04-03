import postgres from "postgres";

export function generateQueryClient(
	opt?: postgres.Options<Record<string, postgres.PostgresType>>,
) {
	return postgres(opt);
}
