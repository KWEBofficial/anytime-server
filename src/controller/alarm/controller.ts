import { RequestHandler } from 'express';
import AlarmService from '../../service/alarm.service';
import { AlarmResDTO } from '../../type/alarm.dto';
import { BadRequestError } from '../../util/customErrors';
import Member from '../../entity/member.entity';

export const getAlarm: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number((req.user as Member).id);
    console.log(`memberId: ${memberId}`);
    console.log('session: ');
    console.log(req.session);
    /*
    const alarms = (await AlarmService.getAlarm(memberId)).map((alarm) => {
      return <AlarmResDTO>{
        alarmId: alarm.id,
        teamId: alarm.team.id,
        scheduleId: alarm.schedule.id,
        content: alarm.content,
        isRead: alarm.isRead,
      };
    });
    */

    const alarms = await AlarmService.getAlarm(memberId);

    if (!alarms) throw new BadRequestError('알람이 없습니다.');
    console.log('alarms: ');
    console.log(alarms);

    res.json(alarms);
  } catch (error) {
    next(error);
  }
};

export const deleteAlarm: RequestHandler = async (req, res, next) => {
  try {
    const alarmId = Number(req.params.alarmId);
    if (!alarmId) throw new BadRequestError('해당하는 알람이 없습니다.');

    console.log(`alarmId: ${alarmId}`);

    await AlarmService.deleteAlarm(alarmId);

    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const readAlarm: RequestHandler = async (req, res, next) => {
  try {
    const alarmId = Number(req.params.alarmId);
    console.log(`alarmId: ${alarmId}`);
    if (!alarmId) res.status(400); // throw new BadRequestError('해당하는 알람이 없습니다.');
    await AlarmService.readAlarm(alarmId);

    res.status(200);
  } catch (error) {
    next(error);
  }
};
