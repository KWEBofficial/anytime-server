import { InsertResult } from 'typeorm';
import Alarm from '../entity/alarm.entity';
import AlarmRepository from '../repository/alarm.repository';
import { InternalServerError } from '../util/customErrors';

export default class AlarmService {
  static async createInviteAlarm(
    memberId: number,
    teamId: number,
  ): Promise<Alarm> {
    try {
      const content = `${teamId} 그룹에 초대되었습니다.`;
      await AlarmRepository.insert({
        member: { id: memberId },
        team: { id: teamId },
        schedule: { id: 1 },
        content: content,
        isRead: false,
      });
      return (
        await AlarmRepository.find({
          where: { member: { id: memberId }, team: { id: teamId } },
        })
      )[0];
    } catch (error) {
      throw new InternalServerError('알람 생성에 실패했습니다.');
    }
  }
}
