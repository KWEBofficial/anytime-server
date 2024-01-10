// 예시 controller입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다. json으로 백과 프론트가 소통
//controller -> service -> repos

import { RequestHandler } from 'express';
import NoticeService from '../../service/notice.service';
import { BadRequestError, ForbiddenError } from '../../util/customErrors';
import { NoticeResDTO, NoticeUpdateReqDTO } from '../../type/notice.dto';

declare module 'express-session' {
  interface SessionData {
    passport: {
      user: number;
    };
  }
}

export const getNotices: RequestHandler = async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId);
    if (isNaN(teamId)) throw new BadRequestError('teamId가 숫자가 아닙니다.');
    const notices = await NoticeService.getNoticeByTeamId(teamId);
    if (!notices) throw new BadRequestError('해당하는 모임이 없습니다.');
    const noticeList = notices.map((notice) => {
      return <NoticeResDTO>{
        noticeId: notice.id,
        content: notice.content,
        createdAt: notice.createdAt,
        isPrior: notice.isPrior,
      };
    });
    res.status(200).json(noticeList);
  } catch (error) {
    next(error);
  }
};

export const createNotice: RequestHandler = async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId);
    const team = await NoticeService.findTeamById(teamId);
    if (!team) throw new BadRequestError('해당하는 모임이 없습니다.');

    const NoticeUpdateReqDTO: NoticeUpdateReqDTO = req.body;
    if (NoticeUpdateReqDTO.startDate > NoticeUpdateReqDTO.endDate)
      throw new BadRequestError('시작일이 끝나는 일보다 늦을 수 없습니다.');
    NoticeService.createNotice(
      team,
      NoticeUpdateReqDTO.content,
      NoticeUpdateReqDTO.startDate,
      NoticeUpdateReqDTO.endDate,
      NoticeUpdateReqDTO.isPrior,
    );
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const updateNotice: RequestHandler = async (req, res, next) => {
  try {
    const noticeId = Number(req.params.noticeId);
    const notice = await NoticeService.findNoticeById(noticeId);
    if (!notice) throw new BadRequestError('해당하는 공지가 없습니다.');

    const NoticeUpdateReqDTO: NoticeUpdateReqDTO = req.body;
    if (NoticeUpdateReqDTO.startDate > NoticeUpdateReqDTO.endDate)
      throw new BadRequestError('시작일이 끝나는 일보다 늦을 수 없습니다.');
    NoticeService.updateNotice(
      noticeId,
      NoticeUpdateReqDTO.content,
      NoticeUpdateReqDTO.startDate,
      NoticeUpdateReqDTO.endDate,
      NoticeUpdateReqDTO.isPrior,
    );
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const deleteNotice: RequestHandler = async (req, res, next) => {
  try {
    const noticeId = Number(req.params.noticeId);
    const notice = await NoticeService.findNoticeById(noticeId);
    if (!notice) throw new BadRequestError('해당하는 공지가 없습니다.');

    NoticeService.deleteNoticeById(noticeId);
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const memberId = Number(req.session.passport?.user);
    const { teamId, noticeId, scheduleId } = req.params;

    if (teamId) {
      if (isNaN(Number(teamId)))
        throw new BadRequestError('teamId가 숫자가 아닙니다.');

      const team = await NoticeService.findTeamById(Number(teamId));
      if (!team) throw new BadRequestError('해당하는 모임이 없습니다.');

      const memberTeam = await NoticeService.findMemberTeam(
        memberId,
        Number(teamId),
      );
      if (!memberTeam)
        throw new BadRequestError('해당하는 모임에 소속되어 있지 않습니다.');
      if (!memberTeam.isAdmin) throw new ForbiddenError('권한이 없습니다.');
    } else if (noticeId) {
      if (isNaN(Number(noticeId)))
        throw new BadRequestError('noticeId가 숫자가 아닙니다.');

      const teamId = await NoticeService.getTeamIdByNoticeId(Number(noticeId));
      if (!teamId) throw new BadRequestError('해당하는 공지가 없습니다.');

      const memberTeam = await NoticeService.findMemberTeam(memberId, teamId);
      if (!memberTeam)
        throw new BadRequestError('해당하는 모임에 소속되어 있지 않습니다.');
      if (!memberTeam.isAdmin) throw new ForbiddenError('권한이 없습니다.');
    } else if (scheduleId) {
      if (isNaN(Number(scheduleId)))
        throw new BadRequestError('scheduleId가 숫자가 아닙니다.');

      const schedule = await NoticeService.findScheById(Number(scheduleId));
      if (!schedule) throw new BadRequestError('해당하는 일정이 없습니다.');

      const teamSchedule = await NoticeService.findTeamScheByScheId(
        Number(scheduleId),
      );
      if (teamSchedule) {
        const teamId = teamSchedule.team.id;
        const isPublic = teamSchedule.team.isPublic;
        if (!isPublic) next();
        else {
          const memberTeam = await NoticeService.findMemberTeam(
            memberId,
            teamId,
          );
          if (!memberTeam)
            throw new BadRequestError(
              '해당하는 모임에 소속되어 있지 않습니다.',
            );
          if (!memberTeam.isAdmin) throw new ForbiddenError('권한이 없습니다.');
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
