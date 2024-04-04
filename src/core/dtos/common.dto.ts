import { Type } from "@sinclair/typebox";

export const SuccessResponseDto = <T>() =>
	Type.Object({
		success: Type.Literal(true),
		data: Type.Unsafe<T>(Type.Unknown()),
	});
export const ErrorResponseDto = () =>
	Type.Object({
		success: Type.Literal(false),
		reason: Type.Optional(
			Type.Union([Type.Record(Type.String(), Type.Unknown()), Type.Null()]),
		),
	});

export const ResponseDtoType = <T>() =>
	Type.Union([SuccessResponseDto<T>(), ErrorResponseDto()]);
