import { RequestHandler } from 'express';
import {
  AllScheSearchResDTO,
  ScheduleDTO,
  TeamMemScheDTO,
} from '../../type/schedule.dto';
declare module 'express-session' {
  interface SessionData {
    passport: {
      user: number;
    };
  }
}

import ScheService from '../../service/schedule.service';

export const ScheAdd: RequestHandler = async (req, res, next) => {
  try {
    const scheAddReq: ScheduleDTO = req.body;
    const memberIdCon = req.session.passport?.user;
    if (memberIdCon !== undefined) {
      const memberId = memberIdCon;
      const schedule = await ScheService.ScheAdd(scheAddReq);
      const member = await ScheService.MemFindById(memberId);
      const memSche = await ScheService.MemScheAdd(member, schedule);
      console.log(memSche.id);
      console.log(schedule.id);
      return res.status(200).json();
    } else {
      throw new Error('session failure');
    }
  } catch (error) {
    next(error);
  }
};

export const TeamScheAdd: RequestHandler = async (req, res, next) => {
  try {
    const publicScheAddReq: ScheduleDTO = req.body;
    const teamId = req.params.teamId as unknown as number;
    const memberIdCon = req.session.passport?.user;
    if (memberIdCon !== undefined) {
      const schedule = await ScheService.ScheAdd(publicScheAddReq);
      const team = await ScheService.TeamFindById(teamId);
      const teamSche = await ScheService.TeamScheAdd(team, schedule);
      console.log(teamSche.id);
      console.log(schedule.id);
      return res.status(200).json();
    } else {
      throw new Error('session failure');
    }
  } catch (error) {
    next(error);
  }
};

export const AllScheSearch: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.session.passport?.user;
    const scheduleIds = await MemScheRepository.find({
      where: { member: memberId },
    });
    const schedules = await ScheRepository.find({
      where: { id: scheduleIds },
    });
    if (schedules != null) {
      const AllScheSearchRes: AllScheSearchResDTO = schedules;
      return res.status(200).json(AllScheSearchRes);
    } else {
      return res.status(400);
    }
  } catch (error) {
    next(error);
  }
};

export const OneScheSearch: RequestHandler = async (req, res, next) => {
  try {
    const scheduleId = req.params.scheduleId as unknown as number;
    const schedule = await ScheService.ScheFindById(scheduleId);
    if (schedule != null) {
      const oneScheSearchRes: ScheduleDTO = {
        name: schedule.schedulename,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        explanation: schedule.explanation,
      };
      res.status(200).json(oneScheSearchRes);
    } else {
      return res.status(400);
    }
  } catch (error) {
    next(error);
  }
};

export const ScheEdit: RequestHandler = async (req, res, next) => {
  try {
    const scheEditReq: ScheduleDTO = req.body;
    const scheduleId = req.params.scheduleId as unknown as number;
    const schedule = await ScheService.ScheFindById(scheduleId);
    if (schedule !== null) {
      schedule.schedulename = scheEditReq.name;
      schedule.startTime = scheEditReq.startTime;
      schedule.endTime = scheEditReq.endTime;
      schedule.explanation = scheEditReq.explanation;
      await ScheService.ScheSave(schedule);
      return res.status(200);
    } else {
      throw new Error('schedule:null');
    }
  } catch (error) {
    next(error);
  }
};

export const ScheDelete: RequestHandler = async (req, res, next) => {
  try {
    const scheduleId = req.params as unknown as number;
    const schedule = await ScheService.ScheFindById(scheduleId);
    if (schedule != null) {
      schedule.deletedAt = await new Date();
      await ScheService.ScheSave(schedule);
      return res.status(200);
    } else {
      return res.status(400);
    }
  } catch (error) {
    next(error);
  }
};

export const TeamMemScheSearch: RequestHandler = async (req, res, next) => {
  try {
    const teamId = req.params.teamId as unknown as number;
    const memberIds = await MemTeamRepository.find({
      where: { team: teamId },
    });
    const scheduleIds = await MemScheRepository.find({
      where: { member: memberIds },
    });
    const schedules = await ScheRepository.find({
      where: { id: scheduleIds },
    });
    if (schedules != null) {
      const teamMemScheSearchRes: TeamMemScheDTO = schedules;
      return res.status(200).json(teamMemScheSearchRes);
    } else {
      return res.status(400);
    }
  } catch (error) {
    next(error);
  }
};
