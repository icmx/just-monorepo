import { int } from './int';

export const pick = <T = unknown>(...items: T[]) =>
  items[int(0, items.length - 1)];
