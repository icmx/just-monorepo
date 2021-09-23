import { OrderDto, VehicleDto } from '@just-monorepo/types';

export type VehicleComponentProps = {
  vehicle: VehicleDto;
  isSelected: boolean;
  onChange: (change: Partial<OrderDto>) => void;
};

export type VehiclesComponentProps = {
  onChange: (change: Partial<OrderDto>) => void;
  onLoading: (isLoading: boolean) => void;
};
