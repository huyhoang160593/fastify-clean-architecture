import { AuthenController } from "@controllers/index.ts";
import { CONTAINER_KEYS } from "@core/constants/index.ts";
import type { IDataServices } from "@core/interfaces/index.ts";
import { UserUseCase } from "@use-cases/user/user.use-case.ts";
import fp from "fastify-plugin";
import { ContainerBuilder } from "node-dependency-injection";
import { AuthenRepository } from "../repositories/index.ts";

export default fp(async (server, _options) => {
	const container = new ContainerBuilder();

	server.decorate("container", container);

	// register repositories
	container
		.register(CONTAINER_KEYS.repository.authentication, AuthenRepository)
		.addArgument(server.db)
		.addArgument(server.bcrypt)
		.addArgument({
      access: server.jwt.sign,
      refresh: server.jwt.refresh.sign,
    });
	// register data services. Instead of create a new class, use a synthetic instance. Hack here: https://github.com/zazoomauro/node-dependency-injection/issues/41
	container.register(CONTAINER_KEYS.services).synthetic = true;
	container.set(CONTAINER_KEYS.services, {
		users: container.get(CONTAINER_KEYS.repository.authentication),
	} satisfies IDataServices);

	// register use cases
	container
		.register(CONTAINER_KEYS.useCase.user, UserUseCase)
		.addArgument(container.get(CONTAINER_KEYS.services));

	// register controllers
	container
		.register(CONTAINER_KEYS.controller.authen, AuthenController)
		.addArgument(container.get(CONTAINER_KEYS.useCase.user));
});

declare module "fastify" {
	interface FastifyInstance {
		container: ContainerBuilder;
	}
}
