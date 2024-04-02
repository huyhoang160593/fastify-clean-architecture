import { type Static, Type } from "@sinclair/typebox";

export const envSchema = Type.Object({
	PORT: Type.Number({
		default: 3000,
		description: "Port that server will use for listening on",
	}),
	HOST: Type.String({
		default: "127.0.0.1",
		description: "Host that server will use for listening on",
	}),
  POSTGRES_HOSTNAME: Type.String({
    description: "Host that database will use for connection",
  }),
  POSTGRES_PORT: Type.Number({
    description: "Port that database will use for connection",
  }),
  POSTGRES_USER: Type.String({
    description: "Username that database will use for connection",
  }),
  POSTGRES_PASSWORD: Type.String({
    description: "Password that database will use for connection",
  }),
  POSTGRES_DB: Type.String({
    description: "Database name that database will use for connection",
  }),
});
export type EnvironmentVariable = Static<typeof envSchema>;
