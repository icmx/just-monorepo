import { ModelEnum } from './model.enum';

export interface VehicleDto {
  id: number;
  model: ModelEnum;
  price: number;
  rating: number;
}
