import Alarm from '../entity/alarm.entity';
import AlarmRepository from '../repository/alarm.repository';
import { InternalServerError } from '../util/customErrors';

export default class AlarmService {
  static async getAlarm(id: number): Promise<Alarm[]> {
    try {
      return await AlarmRepository.find({ where: { id } });
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }
  static async deleteAlarm(id: number): Promise<Alarm> {
    try {
      return await AlarmRepository.softRemove({ id });
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }

  static async readAlarm(id: number): Promise<Alarm | null> {
    try {
      await AlarmRepository.update(
        { id },
        {
          isRead: 0,
        },
      );
      return await AlarmRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }
}
