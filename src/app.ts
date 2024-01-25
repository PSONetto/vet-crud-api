import cors from 'cors';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req: Request, res: Response) => {
  res.send('Hello World');
});

app.use((error: Error, req: Request, res: Response) => {
  res.status(500).send(error.message);
});

export default app;
