import { float } from './float';

/**
 * Returns random number with fixed point in a range of `min`
 * (inclusive) and `max` (inclusive).
 * @param min
 * @param max
 * @param fractionDigits - Number of digits after the decimal point
 * @example
 * fixed(1, 5, 2); // -> 1.12
 * fixed(1, 5, 2); // -> 2.04
 * fixed(1, 5, 2); // -> 3
 */
export const fixed = (
  min: number,
  max: number,
  fractionDigits: number
): number => parseFloat(float(min, max).toFixed(fractionDigits));
