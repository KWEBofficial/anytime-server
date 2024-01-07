import Alarm from '../entity/alarm.entity';
import AlarmRepository from '../repository/alarm.repository';
import { InternalServerError } from '../util/customErrors';
import { DeleteResult } from 'typeorm';

export default class AlarmService {
  static async getAlarm(alarmId: number): Promise<Alarm[]> {
    try {
      const alarm = await AlarmRepository.findBy({ id: alarmId });
      console.log(`alarm: ${alarm}`);
      return alarm;
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }
  static async deleteAlarm(alarmId: number): Promise<DeleteResult> {
    try {
      const alarm = await AlarmRepository.findBy({ id: alarmId });
      console.log(alarm);
      return await AlarmRepository.softDelete(alarm[0].id);
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }

  static async readAlarm(alarmId: number): Promise<Alarm | null> {
    try {
      const alarm = await AlarmRepository.findBy({ id: alarmId });
      if (!alarm) return null;
      alarm[0].isRead = true;
      console.log(alarm);
      return await AlarmRepository.save(alarm[0]);
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }
}
