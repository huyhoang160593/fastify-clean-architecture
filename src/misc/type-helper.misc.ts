export type PickMatching<T, V> =
    { [K in keyof T as T[K] extends V ? K : never]: T[K] }

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type WrapNonPromiseInPromise<T> = T extends Promise<any> ? T : Promise<T>;