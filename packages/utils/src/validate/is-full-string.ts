import { isString } from './is-string';

export const isFullString = (value: unknown): value is string =>
  isString(value) && value.length > 0;
