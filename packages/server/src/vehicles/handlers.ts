import { Request, Response } from 'express';

import { times } from '@just-monorepo/utils';

import { mockVehicles } from './utilities';

export const findAllVehicles = async (request: Request, response: Response) => {
  console.log(`Trying to get all available vehicles.`);

  await times.delay(1000);

  const vehicles = mockVehicles();
  console.log(`Sending vehicles: ${JSON.stringify(vehicles)}`);

  response.status(200).json(vehicles);
};
