import MemberRepository from '../repository/member.repository';
import { MemberRegisterReqDTO } from '../type/member.dto';
import { InternalServerError } from '../util/customErrors';

export default class MemberService {
  static async registerMember(member: MemberRegisterReqDTO): Promise<null> {
    try {
      await MemberRepository.create(member);
      return null;
    } catch (error) {
      throw new InternalServerError('유저 정보를 저장하는데 실패했습니다.');
    }
  }
}
