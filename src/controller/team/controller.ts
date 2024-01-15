import { RequestHandler } from 'express';
import TeamService from '../../service/team.service';
import {
  MyTeamResDTO,
  NoticesDTO,
  SchedulesDTO,
  TeamCreateReqDTO,
  TeamListResDTO,
  TeamMemberDTO,
  TeamReadResDTO,
  TeamUpdateReqDTO,
} from '../../type/team.dto';
import Team from '../../entity/team.entity';
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from '../../util/customErrors';
import MemberTeamService from '../../service/memberTeam.service';
import ScheService from '../../service/schedule.service';
import NoticeService from '../../service/notice.service';
import { NoticeResDTO } from '../../type/notice.dto';

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: number;
    };
  }
}

export const createTeam: RequestHandler = async (req, res, next) => {
  try {
    const { teamname, color, explanation, isPublic } =
      req.body as TeamCreateReqDTO;
    const createTeamInput = { teamname, color, explanation, isPublic };

    const memberId = req.session.passport?.user;
    if (!memberId) throw new UnauthorizedError('로그인이 필요합니다.');
    else {
      const team = await TeamService.createTeam(createTeamInput, memberId);
      res.status(201).json(team.id);
    }
  } catch (error) {
    next(error);
  }
};

//userId에 해당하는 team 정보 가져오기
export const myTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.session.passport?.user;
    if (!memberId) throw new UnauthorizedError('로그인이 필요합니다.');
    else {
      const teams = (await TeamService.getTeamByMember(
        memberId,
      )) as MyTeamResDTO[];
      res.status(200).json(teams);
    }
  } catch (error) {
    next(error);
  }
};

// query를 사용하여 team 정보 가져오기
export const searchTeam: RequestHandler = async (req, res, next) => {
  try {
    const keyword = String(req.query.name);
    const teams = (await TeamService.getTeamByName(
      keyword,
    )) as TeamListResDTO[];

    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

// param와 body를 사용하여 해당하는 team 정보 수정
export const updateTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.session.passport?.user;
    if (!memberId) throw new UnauthorizedError('로그인이 필요합니다.');

    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) throw new BadRequestError('teamId가 숫자가 아닙니다.');

    const memberTeam = await NoticeService.findMemberTeam(memberId, teamId);
    if (!memberTeam)
      throw new BadRequestError('해당하는 모임에 소속되어 있지 않습니다.');
    if (!memberTeam.isAdmin) throw new ForbiddenError('권한이 없습니다.');

    const { teamname, color, explanation } = req.body as TeamUpdateReqDTO;
    const createTeamInput = { teamname, color, explanation };

    const team = await TeamService.updateTeam(teamId, createTeamInput);

    if (!team) throw new BadRequestError('해당하는 모임이 없습니다.');
    else res.status(200).json(team.id);
  } catch (error) {
    next(error);
  }
};

export const showTeam: RequestHandler = async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) throw new BadRequestError('teamId가 숫자가 아닙니다.');
    const memberId = req.session.passport?.user;
    if (!memberId) throw new UnauthorizedError('로그인이 필요합니다.');

    const memberTeam = await NoticeService.findMemberTeam(memberId, teamId);
    if (!memberTeam)
      throw new BadRequestError('해당하는 모임에 소속되어 있지 않습니다.');

    const teamInfo = await TeamService.getTeamById(teamId);
    if (teamInfo) {
      const { teamname, color, explanation, isPublic } = teamInfo;

      // team id로 schedule 찾기
      const scheduleList = await ScheService.ScheFindByTeam(teamInfo);
      if (!scheduleList) throw new BadRequestError('해당하는 모임이 없습니다.');
      const schedules = scheduleList.map((schedule) => {
        return <SchedulesDTO>{
          id: schedule.id,
          schedulename: schedule.schedulename,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          explanation: schedule.explanation,
        };
      });

      // team id로 notice 찾기
      const noticeList = await NoticeService.getNoticeByTeamId(teamId);
      if (!noticeList) throw new BadRequestError('해당하는 모임이 없습니다.');
      const notices = noticeList.map((notice) => {
        return <NoticesDTO>{
          id: notice.id,
          content: notice.content,
          createdAt: notice.createdAt,
          isPrior: notice.isPrior,
        };
      });
      // team id로 member 찾기
      const members = (await TeamService.getMemberByTeam(
        teamId,
      )) as TeamMemberDTO[];

      // user id로 해당 team의 admin인지 확인
      const isAdmin = await TeamService.getIsAdmin(memberId, teamId);

      const TeamReadRes: TeamReadResDTO = {
        teamname,
        color,
        explanation,
        isPublic,
        schedules,
        notices,
        members,
        isAdmin,
      };

      res.status(200).json(TeamReadRes);
    } else throw new BadRequestError('해당하는 모임이 없습니다.');
  } catch (error) {
    next(error);
  }
};

export const deleteTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.session.passport?.user;
    if (!memberId) throw new UnauthorizedError('로그인이 필요합니다.');
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) throw new BadRequestError('teamId가 숫자가 아닙니다.');

    const memberTeam = await NoticeService.findMemberTeam(memberId, teamId);
    if (!memberTeam)
      throw new BadRequestError('해당하는 모임에 소속되어 있지 않습니다.');
    if (!memberTeam.isAdmin) throw new ForbiddenError('권한이 없습니다.');

    const result = await TeamService.deleteTeam(teamId);

    if (result) res.status(200).json({ message: 'delete' });
    else throw new BadRequestError('해당하는 모임이 없습니다.');
  } catch (error) {
    next(error);
  }
};
