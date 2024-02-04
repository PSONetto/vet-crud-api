import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';

import ownerRouter from './routers/ownerRouter';
import petRouter from './routers/petRouter';

function configureMiddleware(app: Express): void {
  app.use(morgan('tiny'));
  app.use(
    cors({
      origin: process.env.ALLOW_ORIGIN,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['X-Requested-With', 'content-type'],
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(express.json());
}

function configureRoutes(app: Express): void {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
  });

  app.use('/owner', ownerRouter);
  app.use('/pet', petRouter);

  app.use((error: Error, req: Request, res: Response) => {
    res.status(500).send(error.message);
  });
}

export function createApp(): Express {
  const app = express();

  configureMiddleware(app);
  configureRoutes(app);

  return app;
}
