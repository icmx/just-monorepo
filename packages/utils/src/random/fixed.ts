import { float } from './float';

export const fixed = (min: number, max: number, fractionDigits?: number) =>
  parseFloat(float(min, max).toFixed(fractionDigits));
