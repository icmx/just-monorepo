/**
 * Returns true If value has `number` type.
 * @param value
 * @returns
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';
