import type { SensibleOptions } from "@fastify/sensible";
import sensible from "@fastify/sensible";
import fp from "fastify-plugin";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<SensibleOptions>(async (server, opts) => {
	void server.register(sensible, {
		...opts,
	});
});
