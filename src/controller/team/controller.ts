import { RequestHandler } from 'express';
import TeamService from '../../service/team.service';
import {
  TeamCreateReqDTO,
  TeamListResDTO,
  TeamUpdateReqDTO,
} from '../../type/team.dto';
import Team from '../../entity/team.entity';
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from '../../util/customErrors';

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
      )) as TeamListResDTO[];
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
    const id = Number(req.params.teamId);
    if (isNaN(id)) throw new BadRequestError('teamId가 숫자가 아닙니다.');
    const { teamname, color, explanation } = req.body as TeamUpdateReqDTO;
    const createTeamInput = { teamname, color, explanation };

    const team = await TeamService.updateTeam(id, createTeamInput);

    res.status(200).json(team.id);
  } catch (error) {
    next(error);
  }
};

export const showTeam: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.teamId);
    const teamInfo = await TeamService.getTeamById(id);
    if (teamInfo) {
      const { teamname, color, explanation, isPublic } = teamInfo;
    } else throw new BadRequestError('존재하지 않는 팀입니다.');

    // team id로 schedule 찾기 - ScheduleService
    // team id로 notice 찾기 - NoticeService
    // team id로 member 찾기 - memberTeam table
    // user id로 해당 team의 admin인지 확인
  } catch (error) {
    next(error);
  }
};

export const deleteTeam: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.teamId);
    if (isNaN(id)) throw new BadRequestError('teamId가 숫자가 아닙니다.');
    const result = await TeamService.deleteTeam(id);

    if (result) res.status(200).json({ message: 'delete' });
    else throw new BadRequestError('존재하지 않는 팀입니다.');
  } catch (error) {
    next(error);
  }
};
