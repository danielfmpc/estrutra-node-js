import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /**
   * findByDate
   * Verifica se existe agendamento nesse horario
   */
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
