import { RequestHandler } from 'express';
import AlarmService from '../../service/alarm.service';
import { AlarmResDTO } from '../../type/alarm.dto';
import { BadRequestError } from '../../util/customErrors';

export const getAlarm: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.id);

    /*
    const { alarmId, teamId, scheduleId, content, isRead } =
      (await AlarmService.getAlarm(member)) as AlarmResDTO;
    const alarm: AlarmResDTO = {
      alarmId,
      teamId,
      scheduleId,
      content,
      isRead,
    };*/
    const alarms = (await AlarmService.getAlarm(memberId)).map(
      (alarm) => alarm as AlarmResDTO,
    );
    if (!alarms) throw new BadRequestError('알람이 없습니다.');

    res.json(alarms);
  } catch (error) {
    next(error);
  }
};

export const deleteAlarm: RequestHandler = async (req, res, next) => {
  try {
    const alarmId = Number(req.params.alarmId);
    await AlarmService.deleteAlarm(alarmId);
  } catch (error) {
    next(error);
  }
};

export const readAlarm: RequestHandler = async (req, res, next) => {
  try {
    const alarmId = Number(req.params.alarmId);
    await AlarmService.readAlarm(alarmId);
  } catch (error) {
    next(error);
  }
};
