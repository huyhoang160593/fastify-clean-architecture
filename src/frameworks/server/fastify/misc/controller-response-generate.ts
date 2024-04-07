import type { PickMatching } from "src/misc/type-helper.misc.ts";

export async function controllerResponseGenerate<
	Y extends {
		// biome-ignore lint/complexity/noBannedTypes: this type will filter and get all functions in the class
		[T in keyof PickMatching<Y, Function>]: Y[T] extends (
			...args: infer A
		) => infer R
			? (...args: A) => R extends Promise<unknown> ? R : never
			: never;
	},
>(
	controllerInstance: Y,
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	methodName: keyof PickMatching<Y, Function>,
	args: Parameters<Y[typeof methodName]>,
	responseCallback: (
		response: Awaited<ReturnType<Y[typeof methodName]>>,
	) => unknown,
) {
	const controllerResponse = await controllerInstance[methodName](...args);
	responseCallback(
		controllerResponse as Awaited<ReturnType<Y[typeof methodName]>>,
	);
}
