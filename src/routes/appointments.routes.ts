import { Router } from 'express';

const appointmentsRoute = Router();

appointmentsRoute.get('/', (request, response) => {
  return response.json({ message: 'ok' });
});

export default appointmentsRoute;
