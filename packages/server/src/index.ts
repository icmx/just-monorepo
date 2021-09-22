import cors from 'cors';
import express from 'express';

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}/`)
);
