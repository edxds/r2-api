import { HttpException } from '@nestjs/common';

export function ensureFound<T>(
  subject: T,
  message = 'Item não encontrado!',
): asserts subject is NonNullable<T> {
  if (subject === null || subject === undefined) {
    throw new HttpException(message, 404);
  }
}
