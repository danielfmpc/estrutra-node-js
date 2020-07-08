import { Router } from 'express';
import { uuid } from "uuidv4";
const appointmentsRoute = Router();

interface DTO{
  provider: string,
  date: Date
};

const appointments:DTO[] = [];
appointmentsRoute.get('/', (request, response) => {
  return response.json(appointments);
});

appointmentsRoute.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  }

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRoute;
