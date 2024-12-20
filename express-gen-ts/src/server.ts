  import cors from 'cors';
  import express, { Request, Response, NextFunction } from 'express';
  import cookieParser from 'cookie-parser';
  import morgan from 'morgan';
  import path from 'path';
  import helmet from 'helmet';
  import logger from 'jet-logger';

  import apiRouter from '@src/routes/index';
  import BaseRouter from '@src/routes/index';
  import Paths from '@src/common/Paths';
  import EnvVars from '@src/common/EnvVars';
  import HttpStatusCodes from '@src/common/HttpStatusCodes';
  import { NodeEnvs } from '@src/common/misc';
  import { RouteError } from '@src/common/classes';

  // **** Variables **** //
  export const app = express();

  const origenesPermitidos = ['http://localhost:3000', 'http://localhost:3001'];

  /*const options: cors.CorsOptions = {
    origin: origenesPermitidos,
  };*/

  // Aplicar CORS con opciones específicas
  app.use(cors({ origin: origenesPermitidos }));

  app.use(express.json());
  app.use('/api', apiRouter);

  // **** Setup **** //

  // Basic middleware
  //app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(EnvVars.CookieProps.Secret));

  // Show routes called in console during development
  if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
    app.use(morgan('dev'));
  }

  // Security
  if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
    app.use(helmet());
  }

  // Add APIs, must be after middleware
  app.use(Paths.Base, BaseRouter);

  // Add error handler
  app.use((
    err: Error,
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
      logger.err(err, true);
    }
    let status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
      status = err.status;
    }
    return res.status(status).json({ error: err.message });
  });

  // ** Front-End Content ** //

  // Set views directory (html)
  const viewsDir = path.join(__dirname, 'views');
  app.set('views', viewsDir);

  // Set static directory (js and css).
  const staticDir = path.join(__dirname, 'public');
  app.use(express.static(staticDir));

  // Nav to users pg by default
  app.get('/', (_: Request, res: Response) => {
    return res.redirect('/users');
  });

  // Redirect to login if not logged in.
  app.get('/users', (_: Request, res: Response) => {
    return res.sendFile('users.html', { root: viewsDir });
  });

  // **** Export default **** //
  export default app;
