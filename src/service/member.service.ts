import Member from '../entity/member.entity';
import MemberRepository from '../repository/member.repository';
import { InternalServerError } from '../util/customErrors';

export default class MemberService {
  /*static async registerMember(member: MemberRegisterReqDTO): Promise<null> {
    try {
      await MemberRepository.create(member);
      return null;
    } catch (error) {
      throw new InternalServerError('유저 정보를 저장하는데 실패했습니다.');
    }
  }*/

  static async getMemberByEmail(email: string): Promise<Member | null> {
    try {
      return await MemberRepository.findOne({ where: { email: email } });
    } catch (error) {
      throw new InternalServerError('유저 정보를 불러오는데 실패했습니다.');
    }
  }
}
