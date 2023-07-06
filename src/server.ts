import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const port = 3000;
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${address}`);
});
