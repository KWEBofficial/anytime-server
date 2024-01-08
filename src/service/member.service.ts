import Member from '../entity/member.entity';
import MemberRepository from '../repository/member.repository';
import { InternalServerError } from '../util/customErrors';

export default class MemberService {
  static async getMemberByEmail(email: string): Promise<Member | null> {
    try {
      return await MemberRepository.findOne({ where: { email: email } });
    } catch (error) {
      throw new InternalServerError('유저 정보를 불러오는데 실패했습니다.');
    }
  }

  static async saveMember(
    email: string,
    membername: string,
    password: string,
  ): Promise<Member> {
    try {
      return await MemberRepository.save({
        email: email,
        membername: membername,
        password: password,
      });
    } catch (error) {
      throw new InternalServerError('유저 정보를 저장하는데 실패했습니다.');
    }
  }

  static async findMember(memberId: number): Promise<Member | null> {
    try {
      const member = await MemberRepository.findOne({
        where: { id: memberId },
      });
      if (!member) return null;
      return member;
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }
}
