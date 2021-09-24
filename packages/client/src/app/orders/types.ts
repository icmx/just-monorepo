import { OrderDto } from '@just-monorepo/types';

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
