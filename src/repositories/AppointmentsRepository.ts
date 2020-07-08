import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /**
   * all
   * retorna todos os dados
   */
  public all(): Appointment[] {
    return this.appointments;
  }

  /**
   * findByDate
   * Verifica se existe agendamento nesse horario
   */
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null;
  }

  /**
   * create
   * cria o agendamento
   */
  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
