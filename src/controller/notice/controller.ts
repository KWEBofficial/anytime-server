// 예시 controller입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다. json으로 백과 프론트가 소통
//controller -> service -> repos
import { RequestHandler } from 'express';
import NoticeService from '../../service/notice.service';
import { BadRequestError } from '../../util/customErrors';
import { NoticeResDTO } from '../../type/notice.dto';
import team from '../../entity/team.entity';

/*
export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.query.id);

    const user = await UserService.getUserById(id);
    if (!user) throw new BadRequestError('해당하는 유저가 없습니다.');

    res.json(user);
  } catch (error) {
    next(error);
  }
};
*/

export const getNotices: RequestHandler = async (req, res, next) => {
  try {
    const {teamId} : team = req.params; //
    const notices = await NoticeService.getNoticeById(teamId).map(
        (notice) => notice as NoticeResDTO,
        );

    res.json(notices);
  } catch (error) {
    next(error);
  }
};

export const createNotice: RequestHandler = async (req, res, next) => {
  try {
    const 
  } catch (error) {
    next(error);
  }
};
export const updateNotice: RequestHandler = async (req, res, next) => {};
export const deleteNotice: RequestHandler = async (req, res, next) => {};
