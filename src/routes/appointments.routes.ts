import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRoute = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRoute.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRoute.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRoute;
