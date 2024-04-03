import { Type } from "@sinclair/typebox";

export const ResponseDtoType = <T>() =>
	Type.Union([
		Type.Object({
			success: Type.Literal(true),
			data: Type.Unsafe<T>(Type.Unknown()),
		}),
		Type.Object({
			success: Type.Literal(false),
			reason: Type.Optional(
				Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
			),
		}),
	]);
