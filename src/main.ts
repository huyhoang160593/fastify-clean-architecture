import type { ServerInstance } from "@core/abstracts/index.ts";
import { FastifyInstance } from "./frameworks/server/index.ts";

bootstrap();

async function bootstrap() {
	const application: ServerInstance = new FastifyInstance();

	await application.setup();
	application.listen();
}
