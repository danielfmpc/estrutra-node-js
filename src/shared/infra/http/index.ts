import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import upload from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(upload.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statuscode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Started');
});
