/**
 * Creates a delay promise before some action.
 * @param ms - Delay value in milliseconds.
 * @example
 * delay(2000).then(() => console.log('Read this after 2 seconds!'));
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
