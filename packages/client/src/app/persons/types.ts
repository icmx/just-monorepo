import { OrderDto } from '@just-monorepo/types';

export type PersonComponentProps = {
  onChange: (change: Partial<OrderDto>) => void;
};
