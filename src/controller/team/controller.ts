import { RequestHandler } from 'express';
import TeamService from '../../service/team.service';

export const createTeam: RequestHandler = async (req, res, next) => {
  try {
    const { teamname, color, explanation, isPublic } = req.body;
    const createTeamInput = { teamname, color, explanation, isPublic };

    const team = await TeamService.saveTeam(createTeamInput);

    res.status(200).json(team.id);
  } catch (error) {
    next(error);
  }
};

//userId에 해당하는 team 정보 가져오기
export const MyTeam: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// query를 사용하여 team 정보 가져오기
export const searchTeam: RequestHandler = async (req, res, next) => {
  try {
    //const keyword = String(req.query.name);
  } catch (error) {
    next(error);
  }
};

// param와 body를 사용하여 해당하는 team 정보 수정
export const updateTeam: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.teamId);

    const { teamname, color, explanation } = req.body;
  } catch (error) {
    next(error);
  }
};

export const showTeam: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.teamId);
  } catch (error) {
    next(error);
  }
};

export const deleteTeam: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.teamId);
  } catch (error) {
    next(error);
  }
};
