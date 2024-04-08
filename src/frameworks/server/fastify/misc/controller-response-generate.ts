import type { PickMatching } from "src/misc/type-helper.misc.ts";

export async function controllerResponseGenerate<
	Y extends {
		// biome-ignore lint/complexity/noBannedTypes: this type will filter and get all functions in the class
		[T in keyof PickMatching<Y, Function>]: Y[T] extends (
			...args: infer A
		) => infer R
			? R extends Promise<Awaited<R>>
				? (...args: A) => R
				: (...args: A) => Promise<R>
			: never;
	},
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  T extends keyof PickMatching<Y, Function>
>(
	controllerInstance: Y,
	methodName: T,
	args: Parameters<Y[T]>,
	responseCallback: (
		response: Awaited<ReturnType<Y[T]>>,
	) => unknown,
): Promise<void> {
	const controllerResponse = (await controllerInstance[methodName](
		...args,
	)) as Awaited<ReturnType<Y[T]>>;
	responseCallback(controllerResponse);
}
