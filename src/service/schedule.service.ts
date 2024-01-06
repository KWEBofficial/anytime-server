import ScheRepository from '../repository/schedule.repository';
import { ScheduleDTO } from '../type/schedule.dto';
import { InternalServerError } from '../util/customErrors';

export default class ScheService {
  static async callsche(schedule: ScheduleDTO): Promise<null> {
    try {
      await ScheRepository.create(schedule);
      return null;
    } catch (error) {
      throw new InternalServerError('일정을 불러오는데 실패했습니다.');
    }
  }
}
