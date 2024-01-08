import Alarm from '../entity/alarm.entity';
import AlarmRepository from '../repository/alarm.repository';
import { BadRequestError, InternalServerError } from '../util/customErrors';
import { DeleteResult } from 'typeorm';

export default class AlarmService {
  static async getAlarm(memberId: number): Promise<Alarm[]> {
    try {
      console.log(memberId);
      return await AlarmRepository.createQueryBuilder('alarm')
        .innerJoin('alarm.team', 'team.id')
        .innerJoin('alarm.schedule', 'schedule.id')
        .select([
          'alarm.id',
          'team.id.id',
          'schedule.id.id',
          'alarm.content',
          'alarm.isRead',
        ])
        .where('alarm.member = :memberId', { memberId })
        .getMany();
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }

  static async deleteAlarm(alarmId: number): Promise<DeleteResult> {
    try {
      const alarm = await AlarmRepository.findBy({ id: alarmId });
      return await AlarmRepository.softDelete(alarm[0].id);
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }

  static async readAlarm(alarmId: number): Promise<Alarm> {
    try {
      const alarm = await AlarmRepository.findOneByOrFail({ id: alarmId });
      if (alarm) alarm.isRead = true;
      return await AlarmRepository.save(alarm);
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }

  // 테스트케이스 복구 (deletedAt = null && isRead = false)
  static async restoreAlarm(alarmId: number): Promise<Alarm[]> {
    try {
      const reAlarm = await AlarmRepository.restore(alarmId);
      const alarm = await AlarmRepository.findBy({ id: alarmId });
      alarm[0].isRead = false;
      await AlarmRepository.save(alarm[0]);
      return alarm;
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }
}
