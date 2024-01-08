import { RequestHandler } from 'express';
import MemberTeamService from '../../service/memberTeam.servcie';
import { BadRequestError, ForbiddenError } from '../../util/customErrors';

export const toggleFavoriteTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.user);
    const teamId = Number(req.params.teamId);

    await MemberTeamService.toggleFavoriteTeam(memberId, teamId);

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const toggleHideTeam: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const inviteMember: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const toggleAdmin: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const subsTeam: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const unsubsTeam: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
