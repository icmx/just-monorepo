import { Request, Response } from 'express';

import { OrderDto } from '@just-monorepo/types';
import { times, validate } from '@just-monorepo/utils';

export const createOrder = async (request: Request, response: Response) => {
  const order: OrderDto = request.body;

  console.log(`Trying to create an order: ${JSON.stringify(order)}`);

  await times.delay(1000);

  if (validate.isValidOrder(order)) {
    response.sendStatus(200);
  } else {
    response.sendStatus(400);
  }
};
