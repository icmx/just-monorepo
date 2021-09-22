import { ModelEnum } from '@just-monorepo/types';

export const modelsOrder = new Map<ModelEnum, number>([
  [ModelEnum.Economy, 0],
  [ModelEnum.Comfort, 1],
  [ModelEnum.Business, 2],
]);

export const modelsPrices = new Map<ModelEnum, [number, number]>([
  [ModelEnum.Economy, [150, 300]],
  [ModelEnum.Comfort, [300, 1000]],
  [ModelEnum.Business, [1000, 3000]],
]);
