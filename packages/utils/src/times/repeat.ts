/**
 * Repeats some action specified number of times.
 * @param callback - Action to perform, must be the function.
 * @param times - Number of times to perform `callback`.
 * @returns Array of values returned by `callback`, if it's not `void`
 */
export const repeat = <T = void>(callback: () => T, times: number): T[] => {
  let result: T[] = [];

  for (let i = 0; i < times; i++) {
    result = [...result, callback()];
  }

  return result;
};
