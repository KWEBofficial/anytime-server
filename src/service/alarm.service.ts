import Alarm from '../entity/alarm.entity';
import Team from '../entity/team.entity';
import AlarmRepository from '../repository/alarm.repository';
import { InternalServerError } from '../util/customErrors';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

export default class AlarmService {
  static async getAlarm(memberId: number): Promise<Alarm[]> {
    try {
      return await AlarmRepository.createQueryBuilder('alarm')
        .innerJoin('alarm.team', 'team.id')
        .leftJoin('alarm.schedule', 'schedule.id')
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

  static async deleteAlarm(
    alarmId: number,
    memberId: number,
  ): Promise<DeleteResult | boolean> {
    try {
      const alarm = await AlarmRepository.findOne({
        where: { id: alarmId, member: { id: memberId } },
      });
      if (!alarm) return false;
      return await AlarmRepository.softDelete(alarm.id);
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }

  static async readAlarm(
    alarmId: number,
    memberId: number,
  ): Promise<UpdateResult | boolean> {
    try {
      const alarm = await AlarmRepository.findOne({
        where: { id: alarmId, member: { id: memberId } },
      });
      if (!alarm) return false;
      return await AlarmRepository.update(alarm.id, {
        isRead: true,
      });
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }

  static async createAlarm(
    content: string,
    memberId: number,
    teamId: number,
  ): Promise<InsertResult> {
    try {
      return await AlarmRepository.insert({
        member: { id: memberId },
        team: { id: teamId },
        schedule: { id: null } as any,
        content: content,
        isRead: false,
      });
    } catch (error) {
      throw new InternalServerError('알람 생성에 실패했습니다.');
    }
  }

  // 테스트케이스 복구 (deletedAt = null && isRead = false)
  static async restoreAlarm(alarmId: number): Promise<Alarm[]> {
    try {
      await AlarmRepository.restore(alarmId);
      const alarm = await AlarmRepository.findBy({ id: alarmId });
      alarm[0].isRead = false;
      await AlarmRepository.save(alarm[0]);
      return alarm;
    } catch (error) {
      throw new InternalServerError('알람 정보를 불러오는데 실패했습니다.');
    }
  }
}
