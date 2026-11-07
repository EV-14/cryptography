import * as crypto from 'crypto';
import type { BufferEncoding } from 'node:buffer';

export type PRNG = 'bytes' | 'int' | 'uuid';

export const prng = (
    type: PRNG,
    size: number,
    min: number,
    max: number,
    encoding: BufferEncoding
  ) => {
  switch (type) {
    case 'bytes':
      return crypto.randomBytes(size).toString(encoding);
    case 'int':
      return crypto.randomInt(min, max).toString();
    case 'uuid':
      return crypto.randomUUID();
    default:
      throw new Error(`Tipo de PRNG no soportado: ${type}`);
  }
};
