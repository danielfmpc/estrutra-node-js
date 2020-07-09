import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database';
import upload from './config/upload';

const app = express();

app.use(express.json());
app.use('/file', express.static(upload.directory));
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Started');
});
