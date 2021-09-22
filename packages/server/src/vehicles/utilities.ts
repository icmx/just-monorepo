import { ModelEnum, VehicleDto } from '@just-monorepo/types';
import { random, times } from '@just-monorepo/utils';

import { modelsOrder, modelsPrices } from './constants';

export const sortVehicles = (first: VehicleDto, second: VehicleDto) =>
  modelsOrder.get(first.model) - modelsOrder.get(second.model);

export const mockVehicle = (): VehicleDto => {
  const model = random.pick(
    ModelEnum.Economy,
    ModelEnum.Comfort,
    ModelEnum.Business
  );

  return {
    id: random.int(0, Number.MAX_SAFE_INTEGER),
    model: model,
    price: random.int(...modelsPrices.get(model)),
    rating: random.fixed(3, 5, 1),
  };
};

export const mockVehicles = (): VehicleDto[] =>
  times.repeat<VehicleDto>(mockVehicle, random.int(3, 6)).sort(sortVehicles);
