import { Router } from 'express';
import { uuid } from "uuidv4";
import { startOfHour, parseISO } from "date-fns";

const appointmentsRoute = Router();

interface AppointmentsDTO{
  provider: string,
  date: Date
};

const appointments:AppointmentsDTO[] = [];
appointmentsRoute.get('/', (request, response) => {
  return response.json(appointments);
});

appointmentsRoute.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  }

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRoute;
