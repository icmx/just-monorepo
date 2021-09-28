/**
 * Returns random number with floating point in a range of `min`
 * (inclusive) and `max` (inclusive)
 * @param min
 * @param max
 */
export const float = (min: number, max: number): number =>
  Math.random() * (max - min) + min;
