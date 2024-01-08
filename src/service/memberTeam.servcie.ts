import { UpdateResult } from 'typeorm';
import MemberTeam from '../entity/team.entity';
import MemberTeamRepository from '../repository/memberTeam.repository';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
} from '../util/customErrors';

export default class MemberTeamService {
  static async toggleFavoriteTeam(
    memberId: number,
    teamId: number,
  ): Promise<UpdateResult> {
    try {
      const memberTeam = await MemberTeamRepository.find({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      const isFavor = memberTeam[0].isFavor;
      console.log(memberTeam);
      return await MemberTeamRepository.update(memberTeam[0].id, {
        isFavor: !isFavor,
      });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }
}
