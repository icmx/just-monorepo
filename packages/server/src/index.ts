import cors from 'cors';
import express from 'express';

import { createOrder } from './orders';
import { findAllVehicles } from './vehicles';

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/api/v1/orders', createOrder);
app.get('/api/v1/vehicles', findAllVehicles);

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}/`)
);
