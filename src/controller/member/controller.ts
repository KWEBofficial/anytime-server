import { RequestHandler } from 'express';
import MemberService from '../../service/member.service';
import { MemberSearchResDTO } from '../../type/member.dto';

export const searchMember: RequestHandler = async (req, res) => {
  try {
    const { email } = req.query;
    const member = await MemberService.getMemberByEmail(email as string);
    if (!member) {
      return res.status(400).json({ message: '결과가 없습니다.' });
    }

    const memberData: MemberSearchResDTO = {
      memberId: member.id,
      membername: member.membername,
    };
    res.status(200).json(memberData);
  } catch (error) {
    res.status(400);
  }
};
