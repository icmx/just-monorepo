import React, { ChangeEvent, useState } from 'react';

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

import './styles.css';

export const Loader = ({ isLoading }: LoaderComponentProps) => (
  <aside className={`loader ${isLoading ? 'is-shown' : ''}`}>
    <div className="loader-icon">⌛</div>
  </aside>
);

export const Preview = ({ order, isValid }: PreviewComponentProps) => (
  <section className="card flex is-column">
    <p>Following data will be sent:</p>
    <pre>{JSON.stringify(order, null, 2)}</pre>
    <p>
      Which is <strong>{isValid ? 'valid' : 'invalid'}</strong> data.
    </p>
  </section>
);

export const Result = ({ result, onClose }: ResultComponentProps) => (
  <section className={`result card ${result === undefined ? '' : 'is-shown'}`}>
    <h1>{result ? 'Great!' : 'Uh-oh...'}</h1>
    <p>
      {result
        ? 'Rent order was successfully created.'
        : 'There was a problem during order creation.'}
    </p>
    <button className="button" type="button" onClick={onClose}>
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
    const update: OrderDto = { ...order, ...change };

    setOrder(update);
    setIsValid(validate.isValidOrder({ ...update }));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    api
      .createOrder(order)
      .then(
        (result) => setResult(result),
        () => setResult(false)
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <form onSubmit={handleSubmit} className="flex is-column">
        <Vehicles onChange={handleChange} onLoading={setIsLoading} />
        <Person onChange={handleChange} />
        <Preview order={order} isValid={isValid} />
        <button className="button" type="submit" disabled={!isValid}>
          Order It
        </button>
        <Result result={result} onClose={() => setResult(undefined)} />
      </form>
    </>
  );
};
