import { ModelEnum } from '@just-monorepo/types';

export const VEHICLES_API = `http://localhost:3000/api/v1`;

export const vehicleIcons = new Map<ModelEnum, string>([
  [ModelEnum.Business, '🚁'],
  [ModelEnum.Comfort, '🚗'],
  [ModelEnum.Economy, '🚲'],
]);

export const vehicleModelNames = new Map<ModelEnum, string>([
  [ModelEnum.Business, 'Business'],
  [ModelEnum.Comfort, 'Comfort'],
  [ModelEnum.Economy, 'Economy'],
]);
