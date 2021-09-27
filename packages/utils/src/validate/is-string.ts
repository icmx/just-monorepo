/**
 * Returns true if value has `string` type.
 * @param value
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string';
