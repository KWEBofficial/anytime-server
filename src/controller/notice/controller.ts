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

    res.json(noticeList);
  } catch (error) {
    next(error);
  }
};

export const createNotice: RequestHandler = async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId);
    const { content, startDate, endDate, isPrior } =
      req.body as NoticeUpdateReqDTO;
    const createNoticeInput = {
      team: teamId,
      content: content,
      startDate: startDate,
      endDate: endDate,
      isPrior: isPrior,
    };
    const notice = await NoticeService.createNotice(createNoticeInput);
  } catch (error) {
    next(error);
  }
};

export const updateNotice: RequestHandler = async (req, res, next) => {};
export const deleteNotice: RequestHandler = async (req, res, next) => {};
