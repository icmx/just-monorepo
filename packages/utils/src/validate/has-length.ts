export const hasLength = (
  value: unknown & { length: number },
  length?: number
) => (length ? value.length === length : value.length >= 0);
