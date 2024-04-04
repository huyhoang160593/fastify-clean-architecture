// Require the framework and instantiate it
import Fastify from "fastify";
import * as fastifyEnv from "@fastify/env";
import {
	envSchema,
	type EnvironmentVariable,
} from "@core/entities/environment-variable.entity.ts";
import { ServerInstance } from "@core/abstracts/index.ts";
import fastifyAutoload from "@fastify/autoload";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";

const fastifyEnvOpt: fastifyEnv.FastifyEnvOptions = {
	dotenv: true,
	schema: envSchema,
};

export class FastifyServerInstance extends ServerInstance {
	protected isSetupSuccessfully = false;

	private app: Fastify.FastifyInstance = Fastify({
		logger: true,
	}).setValidatorCompiler(TypeBoxValidatorCompiler);

	async setup(): Promise<void> {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = dirname(__filename);

		try {
			await this.app.register(fastifyEnv.default, fastifyEnvOpt);
			await this.app.register(fastifyAutoload, {
				dir: join(__dirname, "plugins"),
			});

			this.isSetupSuccessfully = true;
		} catch (error) {
			throw new Error(`Failed to setup server. Error: ${error}`);
		}
	}
	async listen(): Promise<void> {
		if (!this.isSetupSuccessfully) {
			throw new Error(
				"Server not setup successfully. Please call and await setup() before listen()",
			);
		}
		this.app.listen(
			{
				host: this.app.config.HOST,
				port: this.app.config.PORT,
			},
			() => {
				console.info(
					`App listening on the http://${this.app.config.HOST}:${this.app.config.PORT} 🌟👻`,
				);
			},
		);
	}
}

declare module "fastify" {
	interface FastifyInstance {
		config: EnvironmentVariable;
	}
}
