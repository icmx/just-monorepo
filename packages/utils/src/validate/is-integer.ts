/**
 * Returns true If value has `number` type and it's integer.
 * @param value
 * @returns
 */
export const isInteger = (value: unknown): value is number =>
  Number.isInteger(value);
