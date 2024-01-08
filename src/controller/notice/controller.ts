// 예시 controller입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다. json으로 백과 프론트가 소통
//controller -> service -> repos

import { RequestHandler } from 'express';
import NoticeService from '../../service/notice.service';
//import { BadRequestError } from '../../util/customErrors';
import { NoticeResDTO, NoticeUpdateReqDTO } from '../../type/notice.dto';

export const getNotices: RequestHandler = async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId); //
    const notices = await NoticeService.getNoticeById(teamId);
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
    const NoticeUpdateReqDTO: NoticeUpdateReqDTO = req.body;
    const notice = await NoticeService.createNotice(
      teamId,
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
    NoticeService.deleteNotice(noticeId);
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
