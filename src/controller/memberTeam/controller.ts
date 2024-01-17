import { RequestHandler } from 'express';
import MemberTeamService from '../../service/memberTeam.service';
import MemberService from '../../service/member.service';
import { BadRequestError, ForbiddenError } from '../../util/customErrors';
import { InviteReqDTO, AdminReqDTO } from '../../type/memberTeam.dto';
import AlarmService from '../../service/alarm.service';
import TeamService from '../../service/team.service';

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: number;
    };
  }
}

export const toggleFavoriteTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.passport?.user);
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId))
      throw new BadRequestError('팀 아이디가 올바르지 않습니다.');

    const favor = await MemberTeamService.toggleFavoriteTeam(memberId, teamId);
    if (favor === false) throw new BadRequestError('존재하지 않는 그룹입니다.');
    if (favor === true)
      throw new BadRequestError('그룹에 소속해 있지 않습니다.');

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const toggleHideTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.passport?.user);
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId))
      throw new BadRequestError('팀 아이디가 올바르지 않습니다.');

    const hide = await MemberTeamService.toggleHideTeam(memberId, teamId);
    if (hide === false) throw new BadRequestError('존재하지 않는 그룹입니다.');
    if (hide === true)
      throw new BadRequestError('그룹에 소속해 있지 않습니다.');

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const inviteMember: RequestHandler = async (req, res, next) => {
  try {
    const inviteReqDTO: InviteReqDTO = req.body;
    const userId = Number(req.session.passport?.user);

    const member = await MemberService.findMember(inviteReqDTO.memberId);
    if (!member) throw new BadRequestError('존재하지 않는 유저입니다');

    const invite = await MemberTeamService.inviteMember(
      inviteReqDTO.memberId,
      inviteReqDTO.teamId,
      userId,
    );
    if (inviteReqDTO.memberId === userId)
      throw new BadRequestError('본인을 초대할 수 없습니다.');

    if (invite === false)
      throw new BadRequestError('초대하고자 하는 그룹에 속해있지 않습니다');

    if (invite === true) throw new BadRequestError('이미 초대된 유저입니다.');
    const team = await TeamService.getTeamById(inviteReqDTO.teamId);
    if (team) await AlarmService.createInviteAlarm(inviteReqDTO.memberId, team);
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const toggleAdmin: RequestHandler = async (req, res, next) => {
  try {
    const adminReqDTO: AdminReqDTO = req.body;
    const userId = Number(req.session.passport?.user);

    const admin = await MemberTeamService.toggleAdmin(
      adminReqDTO.memberId,
      adminReqDTO.teamId,
      adminReqDTO.isAdmin,
      userId,
    );
    if (admin === true) throw new ForbiddenError('권한이 없습니다.');
    if (admin === false)
      throw new BadRequestError(
        '존재하지 않는 유저이거나 그룹 소속이 아닙니다.',
      );

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const subsTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.passport?.user);
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId))
      throw new BadRequestError('팀 아이디가 올바르지 않습니다.');

    const subs = await MemberTeamService.subsTeam(memberId, teamId);
    if (subs === true) throw new BadRequestError('이미 구독중입니다.');
    if (subs === false) throw new BadRequestError('존재하지 않는 그룹입니다.');

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const unsubsTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.passport?.user);
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId))
      throw new BadRequestError('팀 아이디가 올바르지 않습니다.');

    const unsubs = await MemberTeamService.unsubsTeam(memberId, teamId);
    if (unsubs === true)
      throw new BadRequestError('구독 목록에 없는 그룹입니다.');
    if (unsubs === false)
      throw new ForbiddenError('관리자는 탈퇴할 수 없습니다.');

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
