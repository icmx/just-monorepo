import { OrderDto } from '@just-monorepo/types';

export interface OrdersApi {
  createOrder: (order: OrderDto) => Promise<boolean>;
}

export type LoaderComponentProps = {
  isLoading: boolean;
};

export type PreviewComponentProps = {
  order: OrderDto;
  isValid: boolean;
};

export type ResultComponentProps = {
  result: boolean;
  onClose: () => void;
};
