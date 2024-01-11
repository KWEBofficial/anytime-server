import { RequestHandler } from 'express';
import {
  AllScheSearchResDTO,
  ScheduleDTO,
  TeamScheResDTO,
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
import Team from '../../entity/team.entity';

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
    if (memberId !== undefined) {
      const member = await ScheService.MemFindById(memberId);
      const ownSchedule: ScheduleDTO[] =
        await ScheService.MemToScheduleDTOs(member);
      const teams: Team[] = await ScheService.BelongTeamsFind(member);
      const teamSchedules: TeamScheResDTO[] = await Promise.all(
        teams.map(async (t) => {
          const firstmap: TeamScheResDTO = {
            teamId: t.id,
            teamname: t.teamname,
            schedules: await ScheService.TeamToScheduleDTOs(t),
          };
          return firstmap;
        }),
      );
      const AllScheSearchRes: AllScheSearchResDTO = {
        mySchedules: ownSchedule,
        teamSchedules: teamSchedules,
      };
      return res.status(200).json(AllScheSearchRes);
    } else {
      throw new Error('memberId:undefined');
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
      const oneScheSearchRes: ScheduleDTO =
        await ScheService.ScheToScheduleDTO(schedule);
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
      const result = await ScheService.ScheSave(schedule);
      if (result !== null) {
        return res.status(200).json();
      } else {
        throw new Error('save failure');
      }
    } else {
      throw new Error('schedule:null');
    }
  } catch (error) {
    next(error);
  }
};

export const ScheDelete: RequestHandler = async (req, res, next) => {
  try {
    const scheduleId = req.params.scheduleId as unknown as number;
    const schedule = await ScheService.ScheFindById(scheduleId);
    if (schedule != null) {
      schedule.deletedAt = new Date();
      await ScheService.ScheSave(schedule);
      return res.status(200).json();
    } else {
      return res.status(400).json;
    }
  } catch (error) {
    next(error);
  }
};

export const TeamMemScheSearch: RequestHandler = async (req, res, next) => {
  try {
    const teamId = req.params.teamId as unknown as number;
    const members = await ScheService.TeamMemFind(teamId);
    const TeamMemSches: TeamMemScheDTO[] = await Promise.all(
      members.map(async (t) => {
        const TeamMemSche: TeamMemScheDTO = {
          memberId: t.id,
          schedules: await ScheService.MemToScheResDTOs(t),
        };
        return TeamMemSche;
      }),
    );
    return res.status(200).json(TeamMemSches);
  } catch (error) {
    next(error);
  }
};
