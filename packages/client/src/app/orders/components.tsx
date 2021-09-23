import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { OrderDto } from '@just-monorepo/types';
import { validate } from '@just-monorepo/utils';

import { Person } from '../persons';
import { Vehicles } from '../vehicles';

import { createOrdersApi } from './api';
import { ORDERS_API } from './constants';
import {
  LoaderComponentProps,
  PreviewComponentProps,
  ResultComponentProps,
} from './types';

export const Loader = ({ isLoading }: LoaderComponentProps) => (
  <aside className={`loader ${isLoading && 'is-shown'}`}>
    <div className="loader-icon">⌛</div>
  </aside>
);

export const Preview = ({ order }: PreviewComponentProps) => (
  <code>
    <pre>{JSON.stringify(order, null, 2)}</pre>
  </code>
);

export const Result = ({ result, onClose }: ResultComponentProps) => (
  <section>
    <h1>{result ? 'Great!' : 'Uh-oh...'}</h1>
    <p>
      {result
        ? 'Rent order was successfully created'
        : 'There was a problem during order creation.'}
    </p>
    <button type="button" onClick={onClose}>
      Try once more
    </button>
  </section>
);

export const Order = () => {
  const api = createOrdersApi(ORDERS_API);

  const [order, setOrder] = useState<OrderDto>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [result, setResult] = useState<undefined | boolean>(undefined);

  const handleChange = (change: Partial<OrderDto>) => {
    setOrder({ ...order, ...change });

    setIsValid(validate.isValidOrder({ ...order }));
  };

  const handleClose = () => {
    setOrder(null);
    setResult(undefined);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    api.createOrder(order).then(setResult, () => setResult(false));
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <form onSubmit={handleSubmit}>
        <Vehicles onChange={handleChange} onLoading={setIsLoading} />
        <Person onChange={handleChange} />
        <Preview order={order} />
        <button type="submit" disabled={!isValid}>
          Order It
        </button>
      </form>
      {result !== undefined && <Result result={result} onClose={handleClose} />}
    </>
  );
};
