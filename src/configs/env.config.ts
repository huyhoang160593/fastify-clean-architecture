import "dotenv/config";
import {
	envSchema,
	type EnvironmentVariable,
} from "@core/entities/environment-variable.entity.ts";
import { Value } from "@sinclair/typebox/value";

const envVariablesPreCheck = Value.Convert(
	envSchema,
	Value.Clean(envSchema, Object.assign({}, process.env)),
);
if (!Value.Check(envSchema, envVariablesPreCheck)) {
	console.info("Error when parse environment variables:");
	console.error([...Value.Errors(envSchema, envVariablesPreCheck)]);
	throw new Error(
		"There is error when parse environment variables. Look for the log upward for more detail ↑↑↑",
	);
}
export const envVariables = envVariablesPreCheck as EnvironmentVariable; // The as for type assertion, cause the check has raise error the variable is not define
