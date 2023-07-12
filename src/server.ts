import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './handlers/users';
import dashboardRoutes from './handlers/dashboard';
import orderRoutes from './handlers/orders';
import productRoutes from './handlers/products';


const app: express.Application = express();
const port = 3000;
const address: string = '0.0.0.0:3000';
const corsOptions = {
  origin: 'http://',
  optionSuccessStatus: 200
};
app.use(bodyParser.json());

app.get('/', cors(corsOptions), (req: Request, res: Response) => {
  res.send('Hello, World!');
});

userRoutes(app);
dashboardRoutes(app);
orderRoutes(app);
productRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${address}`);
});

export default app;