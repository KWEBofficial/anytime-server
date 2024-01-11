import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import MemberTeam from '../entity/team.entity';
import MemberTeamRepository from '../repository/memberTeam.repository';
import TeamRepository from '../repository/team.repository';
import { InternalServerError } from '../util/customErrors';

export default class MemberTeamService {
  static async toggleFavoriteTeam(
    memberId: number,
    teamId: number,
  ): Promise<UpdateResult | boolean> {
    try {
      const memberTeam = await MemberTeamRepository.findOne({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      if (!memberTeam) return true;

      const team = await TeamRepository.findOne({ where: { id: teamId } });
      if (!team) return false;

      const isFavor = memberTeam.isFavor;
      return await MemberTeamRepository.update(memberTeam.id, {
        isFavor: !isFavor,
      });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }

  static async toggleHideTeam(
    memberId: number,
    teamId: number,
  ): Promise<UpdateResult | boolean> {
    try {
      const memberTeam = await MemberTeamRepository.findOne({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      if (!memberTeam) return true;
      const team = await TeamRepository.findOne({ where: { id: teamId } });
      if (!team) return false;

      const isHide = memberTeam.isHide;
      return await MemberTeamRepository.update(memberTeam.id, {
        isHide: !isHide,
      });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }

  static async inviteMember(
    memberId: number,
    teamId: number,
    userId: number,
  ): Promise<InsertResult | boolean> {
    try {
      const memberTeam = await MemberTeamRepository.findOne({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      if (memberTeam) return true;

      const userTeam = await MemberTeamRepository.findOne({
        where: { member: { id: userId }, team: { id: teamId } },
      });
      if (!userTeam) return false;

      return await MemberTeamRepository.insert({
        member: { id: memberId },
        team: { id: teamId },
        isAdmin: false,
        isFavor: false,
        isHide: false,
      });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }

  static async toggleAdmin(
    memberId: number,
    teamId: number,
    isAdmin: boolean,
    userId: number,
  ): Promise<UpdateResult | boolean> {
    try {
      const memberTeam = await MemberTeamRepository.findOne({
        where: { member: { id: userId }, team: { id: teamId } },
      });
      if (memberTeam?.isAdmin != true) return true;

      const memberTeam2 = await MemberTeamRepository.findOne({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      if (!memberTeam2) return false;

      return await MemberTeamRepository.update(memberTeam2.id, {
        isAdmin: isAdmin,
      });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }

  static async subsTeam(
    memberId: number,
    teamId: number,
  ): Promise<InsertResult | boolean> {
    try {
      const memberTeam = await MemberTeamRepository.find({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      if (memberTeam[0]) return true;
      const team = await TeamRepository.findOne({ where: { id: teamId } });
      if (!team) return false;

      return await MemberTeamRepository.insert({
        member: { id: memberId },
        team: { id: teamId },
        isAdmin: false,
        isFavor: false,
        isHide: false,
      });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }

  static async unsubsTeam(
    memberId: number,
    teamId: number,
  ): Promise<DeleteResult | boolean> {
    try {
      const memberTeam = await MemberTeamRepository.find({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      if (!memberTeam[0]) return true;
      if (memberTeam[0].isAdmin == true) return false;
      return await MemberTeamRepository.delete({ id: memberTeam[0].id });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }
}
