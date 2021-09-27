import { isString } from './is-string';

/**
 * Returns true if value has `string` type and it's not empty (i.e. has
 * at least one character).
 * @param value
 * @returns
 */
export const isFullString = (value: unknown): value is string =>
  isString(value) && value.length > 0;
