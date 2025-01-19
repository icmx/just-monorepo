import { VehicleDto } from '@just-monorepo/types';
import { VehiclesApi } from './types';

export const createVehiclesApi = (baseUrl: string): VehiclesApi => ({
  findAllVehicles: async (): Promise<VehicleDto[]> => {
    const result = await fetch(`${baseUrl}/vehicles`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result.json();
  },
});
