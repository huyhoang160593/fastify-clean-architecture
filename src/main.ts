import type { ServerInstance } from "@core/abstracts/index.ts";
import { FastifyServerInstance } from "./frameworks/server/index.ts";

bootstrap();

async function bootstrap() {
	const application: ServerInstance = new FastifyServerInstance();

	await application.setup();
	application.listen();
}
