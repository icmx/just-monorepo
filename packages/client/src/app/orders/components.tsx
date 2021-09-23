import React, { useState } from 'react';
import { OrderDto } from '../../../../types/dist';

import { LoaderComponentProps, PreviewComponentProps } from './types';

export const Loader = ({ isLoading }: LoaderComponentProps) => {
  return (
    <aside className={`loader ${isLoading && 'is-shown'}`}>
      <div className="loader-icon">⌛</div>
    </aside>
  );
};

export const Preview = ({ order }: PreviewComponentProps) => {
  return (
    <code>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </code>
  );
};

export const Order = () => {
  const [order, setOrders] = useState<OrderDto>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      Car Renting Service
      <Loader isLoading={isLoading} />
      <Preview order={order} />
    </>
  );
};
