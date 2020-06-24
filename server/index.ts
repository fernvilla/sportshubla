import * as dotenv from 'dotenv';

dotenv.config();

import express, { Request, Response } from 'express';
import logger from 'morgan';
import next from 'next';
import db from './models';
import routes from './routes';

const port = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(logger('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(routes);

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  db.sequelize
    .authenticate()
    .then(() => {
      server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    })
    .catch((err: any) => console.error('Unable to connect to the database:', err));
});
