// 예시 controller입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다. json으로 백과 프론트가 소통
//controller -> service -> repos

import { RequestHandler } from 'express';
import NoticeService from '../../service/notice.service';
import { BadRequestError } from '../../util/customErrors';
import { NoticeResDTO, NoticeUpdateReqDTO } from '../../type/notice.dto';
import TeamRepository from '../../repository/team.repository';

export const getNotices: RequestHandler = async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId); //
    const team = await TeamRepository.findOne({
      where: { id: teamId },
    });
    if (!team) throw new BadRequestError('해당하는 모임이 없습니다.');
    const notices = await NoticeService.getNoticeById(team);
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
    const team = await TeamRepository.findOne({
      where: { id: teamId },
    });
    if (!team) throw new BadRequestError('해당하는 모임이 없습니다.');
    const NoticeUpdateReqDTO: NoticeUpdateReqDTO = req.body;
    NoticeService.createNotice(
      team,
      NoticeUpdateReqDTO.content,
      NoticeUpdateReqDTO.startDate,
      NoticeUpdateReqDTO.endDate,
      NoticeUpdateReqDTO.isPrior,
    );
    //400 BadRequest 일 경우는?
    //공지사항에 내용도 없고 시작시간, 끝 시간이 없으면 좀 그렇지 않을까? 공간만 차지할 듯
    //그리고 teamId가 없는 teamId일때? 시작시간, 끝시간이 순서가 맞지 않을 때?
    //사실 teamId 빼고는 프론트엔드에서 다 되긴 할 텐데
    //401? admin이 아닐 때, admin이지만 본인이 admin인 teamId와 요청의 teamId가 일치하지 않을 때
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

export const isAdmin: RequestHandler = async (req, res, next) => {
  //memberId를 받지 않고 요청을 한 사람이 admin인지 알아야 함
};

export const updateNotice: RequestHandler = async (req, res, next) => {
  try {
    const noticeId = Number(req.params.noticeId);
    const NoticeUpdateReqDTO: NoticeUpdateReqDTO = req.body;
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
    NoticeService.deleteNoticeById(noticeId);
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
