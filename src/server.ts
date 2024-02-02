import { Express } from 'express';

import { createApp } from './app';

function startServer(app: Express, port: number): void {
  app.listen(port, () => {
    console.log(`Server is running at ${port}.`);
  });
}

const PORT = parseInt(`${process.env.PORT || 3000}`);
const app = createApp();
startServer(app, PORT);
