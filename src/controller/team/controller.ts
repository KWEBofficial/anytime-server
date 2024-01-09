import { RequestHandler } from 'express';
import TeamService from '../../service/team.service';
import {
  TeamCreateReqDTO,
  TeamListResDTO,
  TeamUpdateReqDTO,
} from '../../type/team.dto';
import Team from '../../entity/team.entity';

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
    if (!memberId) res.status(403).json();
    else {
      const team = await TeamService.createTeam(createTeamInput, memberId);
      res.status(201).json(team.id);
    }
    // memberTeam table에도 정보(team.id, memberId) 추가 (팀 구독 or 초대)
  } catch (error) {
    next(error);
  }
};

//userId에 해당하는 team 정보 가져오기
export const myTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = req.session.passport?.user;
    if (!memberId) res.status(403).json();
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
    } else return res.status(404).json();

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
    const result = await TeamService.deleteTeam(id);

    if (result) res.status(200).json({ message: 'delete' });
    else res.status(400).json();
  } catch (error) {
    next(error);
  }
};
