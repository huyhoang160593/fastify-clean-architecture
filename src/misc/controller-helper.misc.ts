import { ErrorResponseDto } from "@core/dtos/common.dto.ts";
import type { Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";


export function generateErrorResponse(error: unknown): Static<typeof ErrorResponseDto> {
  // report and log error
  const errorResponse = Value.Create(ErrorResponseDto);
  if (error instanceof Error) {
    errorResponse.reason = {
      message: error.message,
      stack: error.stack,
    };
  }
  return errorResponse;
}
