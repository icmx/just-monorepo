import { int } from './int';

/**
 * Returns randomly picked item from `items` array.
 * @param items
 * @returns
 */
export const pick = <T = unknown>(...items: T[]) =>
  items[int(0, items.length - 1)];
