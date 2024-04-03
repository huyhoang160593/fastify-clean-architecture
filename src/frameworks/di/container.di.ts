import { AuthenController } from "@controllers/index.ts";
import { AuthenRepository } from "@frameworks/database/dizzle/repositories/authen.repository.ts";
import { UserUseCase } from "@use-cases/user/user.use-case.ts";
import type { FastifyInstance } from "fastify";
import { ContainerBuilder } from "node-dependency-injection";

export const container = new ContainerBuilder();

export function registerServices(server: FastifyInstance) {
	// register repositories
	container
		.register("repository.authentication", AuthenRepository)
		.addArgument(server.db)
		.addArgument(server.bcrypt)
		.addArgument(server.jwt);

	// register data services
	container.register("data-services", {
		users: container.get("repository.authentication"),
	});

	// register use cases
	container
		.register("useCase.user", UserUseCase)
		.addArgument(container.get("data-services"));

	// register controllers
	container
		.register("controller.authen", AuthenController)
		.addArgument(container.get("useCase.user"));
}
