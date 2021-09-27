/**
 * Returns true if value has `string` type.
 * @param value
 * @returns
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string';
