import { type TSchema, Type, type Static } from "@sinclair/typebox";

export const SuccessResponseDto = <T extends Static<U>, U extends TSchema>(
	schema?: U,
) => {
	const successResponseObject = {
		statusCode: Type.Number({ default: 200 }),
		success: Type.Literal(true),
	};
	if (schema) {
		return Type.Object({ ...successResponseObject, data: schema });
	}
	return Type.Object({
		...successResponseObject,
		data: Type.Unsafe<T>(Type.Unknown()),
	});
};

export const ErrorResponseDto = Type.Object({
	statusCode: Type.Number({ default: 400 }),
	success: Type.Literal(false),
	reason: Type.Optional(
		Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
	),
});

export const ResponseDto = <T extends Static<U>, U extends TSchema>(
	schema?: U,
) => Type.Union([SuccessResponseDto<T, U>(schema), ErrorResponseDto]);

export const OmitStatusCodeDto = <T extends TSchema>(dto: T) =>
	Type.Omit(dto, ["statusCode"]);
