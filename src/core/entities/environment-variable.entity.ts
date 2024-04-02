import { type Static, Type } from "@sinclair/typebox";

export const envSchema = Type.Object({
  PORT: Type.Number({ default: 3000, description: "Port that server will use for listening on" }),
  HOST: Type.String({ default: "127.0.0.1", description: "Host that server will use for listening on" })
});
export type EnvironmentVariable = Static<typeof envSchema>;
