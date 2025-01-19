import { OrderDto } from '@just-monorepo/types';
import { OrdersApi } from './types';

export const createOrdersApi = (baseUrl: string): OrdersApi => ({
  createOrder: async (order: OrderDto): Promise<boolean> => {
    const result = await fetch(`${baseUrl}/orders`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    return result.status === 200;
  },
});
