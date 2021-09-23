import { OrderDto } from '@just-monorepo/types';

export const createOrdersApi = (baseUrl: string) => ({
  createOrder: async (order: OrderDto): Promise<boolean> => {
    const result = await fetch(`${baseUrl}/orders`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (result.status === 200) {
      return true;
    } else {
      return Promise.reject(false);
    }
  },
});
