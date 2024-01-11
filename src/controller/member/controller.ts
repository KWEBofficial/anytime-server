import { RequestHandler } from 'express';
import MemberService from '../../service/member.service';
import { MemberSearchResDTO } from '../../type/member.dto';
import { BadRequestError } from '../../util/customErrors';

export const searchMember: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.query;
    const member = await MemberService.getMemberByEmail(email as string);
    if (!member) {
      throw new BadRequestError('결과가 없습니다.');
    }

    const memberData: MemberSearchResDTO = {
      memberId: member.id,
      membername: member.membername,
    };
    res.status(200).json(memberData);
  } catch (error) {
    next(error);
  }
};
