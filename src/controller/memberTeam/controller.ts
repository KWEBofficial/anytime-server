import { RequestHandler } from 'express';
import MemberTeamService from '../../service/memberTeam.servcie';
import MemberService from '../../service/member.service';
import { BadRequestError, ForbiddenError } from '../../util/customErrors';
import { InviteReqDTO, AdminReqDTO } from '../../type/memberTeam.dto';
import { memoryUsage } from 'process';
import AlarmService from '../../service/alarm.service';
import { InviteAlarmResDTO } from '../../type/alarm.dto';
import { scheduler } from 'timers/promises';

export const toggleFavoriteTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.user);
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) throw new BadRequestError('teamId가 숫자가 아닙니다.');

    await MemberTeamService.toggleFavoriteTeam(memberId, teamId);

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const toggleHideTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.user);
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) throw new BadRequestError('teamId가 숫자가 아닙니다.');

    await MemberTeamService.toggleFavoriteTeam(memberId, teamId);

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const inviteMember: RequestHandler = async (req, res, next) => {
  try {
    const inviteReqDTO: InviteReqDTO = req.body;
    const member = await MemberService.findMember(inviteReqDTO.memberId);
    if (!member) throw new BadRequestError('존재하지 않는 유저입니다');
    const invite = await MemberTeamService.inviteMember(
      inviteReqDTO.memberId,
      inviteReqDTO.teamId,
    );
    if (!invite) throw new BadRequestError('이미 초대된 유저입니다.');

    const alarm = await AlarmService.createInviteAlarm(
      inviteReqDTO.memberId,
      inviteReqDTO.teamId,
    );

    console.log(alarm);
    console.log(alarm.id);
    console.log(alarm.team.id);
    console.log(alarm.content);
    console.log(alarm.isRead);
    const inviteAlarmResDTO: InviteAlarmResDTO = {
      alarmId: alarm.id,
      teamId: alarm.team.id,
      content: alarm?.content as unknown as string,
      isRead: alarm.isRead,
    };
    console.log(inviteAlarmResDTO);
    return res.status(200).json(inviteAlarmResDTO);
  } catch (error) {
    next(error);
  }
};

export const toggleAdmin: RequestHandler = async (req, res, next) => {
  try {
    const adminReqDTO: AdminReqDTO = req.body;
    const userId = Number(req.user);

    const admin = await MemberTeamService.toggleAdmin(
      adminReqDTO.memberId,
      adminReqDTO.teamId,
      adminReqDTO.isAdmin,
      userId,
    );
    if (!admin) throw new ForbiddenError('권한이 없습니다.');

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const subsTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.user);
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) throw new BadRequestError('teamId가 숫자가 아닙니다.');

    const subs = await MemberTeamService.subsTeam(memberId, teamId);
    if (!subs) throw new BadRequestError('이미 구독중입니다.');

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const unsubsTeam: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.user);
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) throw new BadRequestError('teamId가 숫자가 아닙니다.');

    const unsubs = await MemberTeamService.unsubsTeam(memberId, teamId);
    if (unsubs === true) throw new BadRequestError('이미 구독 취소되었습니다.');
    if (unsubs === false)
      throw new ForbiddenError('관리자는 탈퇴할 수 없습니다.');

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
