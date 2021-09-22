export const repeat = <T = void>(callback: () => T, times: number) => {
  let result: T[] = [];

  for (let i = 0; i < times; i++) {
    result = [...result, callback()];
  }

  return result;
};
