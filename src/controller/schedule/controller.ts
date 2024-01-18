import { RequestHandler } from 'express';
import {
  AllScheSearchResDTO,
  ScheduleDTO,
  TeamScheResDTO,
  TeamMemScheDTO,
} from '../../type/schedule.dto';
import ScheService from '../../service/schedule.service';
import Team from '../../entity/team.entity';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from '../../util/customErrors';
import AlarmService from '../../service/alarm.service';
import TeamService from '../../service/team.service';
import NoticeService from '../../service/notice.service';

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: number;
    };
  }
}
export const ScheAdd: RequestHandler = async (req, res, next) => {
  try {
    const scheAddReq: ScheduleDTO = req.body;
    const memberIdCon = req.session.passport?.user;
    if (scheAddReq.startTime > scheAddReq.endTime) {
      throw new BadRequestError('시작일이 끝나는 일보다 늦을 수 없습니다.');
    }
    if (memberIdCon !== undefined) {
      const memberId = memberIdCon;
      const schedule = await ScheService.ScheAdd(scheAddReq);
      const member = await ScheService.MemFindById(memberId);
      const memSche = await ScheService.MemScheAdd(member, schedule);
      if (memSche != null) {
        return res.status(200).json();
      } else {
        throw new InternalServerError('사용자 일정 관계 저장 실패');
      }
    } else {
      throw new UnauthorizedError('세션 비정상');
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
    if (publicScheAddReq.startTime > publicScheAddReq.endTime) {
      throw new BadRequestError('시작일이 끝나는 일보다 늦을 수 없습니다.');
    }
    if (memberIdCon !== undefined) {
      const schedule = await ScheService.ScheAdd(publicScheAddReq);
      const team = await ScheService.TeamFindById(teamId);
      const teamSche = await ScheService.TeamScheAdd(team, schedule);
      if (teamSche != null) {
        const memberList = TeamService.getMemberByTeam(teamId);
        (await memberList).forEach(
          async (memberInfo) =>
            await AlarmService.createAlarm(
              `${team.teamname}에 ${publicScheAddReq.name} 일정이 추가되었습니다.`,
              memberInfo.id,
              teamId,
            ),
        );
        return res.status(200).json();
      } else {
        throw new InternalServerError('모임 일정 관계 저장 실패');
      }
    } else {
      throw new UnauthorizedError('세션 비정상');
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
            color: t.color,
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
      throw new UnauthorizedError('세션 비정상');
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
      throw new BadRequestError('일정이 존재하지 않습니다.');
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
    if (scheEditReq.startTime > scheEditReq.endTime) {
      throw new BadRequestError('시작일이 끝나는 일보다 늦을 수 없습니다.');
    }
    if (schedule !== null) {
      schedule.schedulename = scheEditReq.name;
      schedule.startTime = scheEditReq.startTime;
      schedule.endTime = scheEditReq.endTime;
      schedule.explanation = scheEditReq.explanation;
      const result = await ScheService.ScheSave(schedule);
      if (result !== null) {
        const teamSchedule = await NoticeService.findTeamScheByScheId(
          Number(scheduleId),
        );
        if (teamSchedule) {
          const team = await TeamService.getTeamById(teamSchedule.team.id);
          if (team)
            await AlarmService.createAlarm(
              `${team.teamname}의 ${schedule.schedulename} 일정이 수정되었습니다.`,
              Number(req.session.passport?.user),
              team.id,
            );
        }
        return res.status(200).json();
      } else {
        throw new InternalServerError('일정 정보 반영 실패');
      }
    } else {
      throw new BadRequestError('일정이 존재하지 않습니다.');
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
      const result = await ScheService.ScheSave(schedule);
      if (result !== null) {
        const teamSchedule = await NoticeService.findTeamScheByScheId(
          Number(scheduleId),
        );
        if (teamSchedule) {
          const team = await TeamService.getTeamById(teamSchedule.team.id);
          if (team)
            await AlarmService.createAlarm(
              `${team.teamname}의 ${schedule.schedulename} 일정이 삭제되었습니다.`,
              Number(req.session.passport?.user),
              team.id,
            );
        }
        return res.status(200).json();
      } else {
        throw new InternalServerError('일정 정보 반영 실패');
      }
    } else {
      throw new BadRequestError('일정이 존재하지 않습니다.');
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

export const isRelated: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.session.passport?.user;
    const { scheduleId } = req.params;
    if (memberId) {
      if (scheduleId) {
        const ascheduleId = scheduleId as unknown as number;
        const relation = await ScheService.RelationFind(memberId, ascheduleId);
        if (relation) {
          next();
        } else {
          throw new ForbiddenError('사용자와 관계가 없는 일정입니다.');
        }
      }
      next();
    } else {
      throw new UnauthorizedError('세션 비정상');
    }
  } catch (error) {
    next(error);
  }
};
