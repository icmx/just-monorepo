/**
 * Returns random integer number in a range from `min` (inclusive) and
 * `max` (inclusive).
 * @param min
 * @param max
 */
export const int = (min: number, max: number): number =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
  Math.ceil(min);
