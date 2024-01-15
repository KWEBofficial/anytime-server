import { RequestHandler } from 'express';
import AlarmService from '../../service/alarm.service';
import { BadRequestError } from '../../util/customErrors';

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: number;
    };
  }
}

export const getAlarm: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.passport?.user);
    const alarms = await AlarmService.getAlarm(memberId);

    res.status(200).json(alarms);
  } catch (error) {
    next(error);
  }
};

export const deleteAlarm: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.passport?.user);
    const alarmId = Number(req.params.alarmId);

    if (!alarmId || isNaN(alarmId))
      throw new BadRequestError('잘못된 요청입니다.');

    if ((await AlarmService.deleteAlarm(alarmId, memberId)) === false)
      throw new BadRequestError('존재하지 않는 알람입니다.');

    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const readAlarm: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.passport?.user);
    const alarmId = Number(req.params.alarmId);

    if (!alarmId || isNaN(alarmId))
      throw new BadRequestError('잘못된 요청입니다.');

    if ((await AlarmService.readAlarm(alarmId, memberId)) === false)
      throw new BadRequestError('존재하지 않는 알람입니다.');

    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const restoreAlarm: RequestHandler = async (req, res, next) => {
  try {
    const alarmId = Number(req.params.alarmId);
    if (!alarmId || isNaN(alarmId))
      throw new BadRequestError('잘못된 요청입니다.');

    await AlarmService.restoreAlarm(alarmId);

    res.status(200).json();
  } catch (error) {
    next(error);
  }
};
