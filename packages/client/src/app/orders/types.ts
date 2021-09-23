import { OrderDto } from '@just-monorepo/types';

export type LoaderComponentProps = {
  isLoading: boolean;
};

export type PreviewComponentProps = {
  order: OrderDto;
};
