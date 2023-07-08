import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mythical_weapons_routes from './handlers/mythical_weapons';
import userRoutes from './handlers/users';
import articleRoutes from './handlers/books';


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

mythical_weapons_routes(app);
userRoutes(app);
articleRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${address}`);
});
