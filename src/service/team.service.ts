import Team from '../entity/team.entity';
import MemberTeam from '../entity/memberTeam.entity';
import TeamRepository from '../repository/team.repository';
import MemberTeamRepository from '../repository/memberTeam.repository';
import { TeamCreateReqDTO, TeamUpdateReqDTO } from '../type/team.dto';
import { InternalServerError } from '../util/customErrors';
import Member from '../entity/member.entity';

export default class TeamService {
  static async createTeam(
    createTeamInput: TeamCreateReqDTO,
    id: number,
  ): Promise<Team> {
    try {
      const teamEntity = await TeamRepository.create(createTeamInput);
      const team = await TeamRepository.save(teamEntity);
      await TeamService.createMemberTeam(id, team.id);
      return team;
    } catch (error) {
      console.log(error);
      throw new InternalServerError('팀 정보를 저장하는데 실패했습니다.');
    }
  }

  static async createMemberTeam(memberId: number, teamId: number) {
    try {
      return await MemberTeamRepository.insert({
        member: { id: memberId },
        team: { id: teamId },
        isAdmin: true,
        isHide: false,
        isFavor: false,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerError('팀-멤버 정보를 저장하는데 실패했습니다.');
    }
  }

  static async getTeamByName(keyword: string): Promise<Team[]> {
    try {
      if (keyword == '') {
        return await TeamRepository.find({
          select: {
            id: true,
            teamname: true,
            color: true,
            explanation: true,
          },
          where: {
            isPublic: true,
          },
        });
      } else {
        return await TeamRepository.createQueryBuilder('team')
          .select([
            'team.id',
            'team.teamname',
            'team.color',
            'team.explanation',
          ])
          .where('team.teamname LIKE :keyword', { keyword: `%${keyword}%` })
          .andWhere('team.is_public = true')
          .getMany();
      }
    } catch (error) {
      throw new InternalServerError('팀 정보를 검색하는데 실패했습니다.');
    }
  }

  static async getTeamById(id: number): Promise<Team | null> {
    try {
      return await TeamRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }

  static async getTeamByMember(id: number) {
    try {
      return await TeamRepository.createQueryBuilder('t')
        .leftJoin(MemberTeam, 'm', 'm.team_id = t.id')
        .select([
          't.id AS teamId',
          't.teamname AS teamname',
          't.is_public AS isPublic',
          'm.is_admin AS isAdmin',
          'm.is_favor AS isFavor',
          'm.is_hide AS isHide',
        ])
        .where('m.member_id = :id', { id: id })
        .getRawMany();
    } catch (error) {
      throw new InternalServerError('멤버-팀 정보를 불러오는데 실패했습니다.');
    }
  }

  static async getMemberByTeam(id: number) {
    try {
      return await MemberTeamRepository.createQueryBuilder('mt')
        .leftJoin(Member, 'm', 'm.id = mt.member_id')
        .select([
          'm.id AS id',
          'm.membername AS name',
          'mt.is_admin AS isAdmin',
        ])
        .where('mt.team_id = :id', { id: id })
        .getRawMany();
    } catch (error) {
      throw new InternalServerError('팀-멤버 정보를 불러오는데 실패했습니다.');
    }
  }

  static async getIsAdmin(
    memberId: number,
    teamId: number,
  ): Promise<boolean | null> {
    try {
      const memberTeam = await MemberTeamRepository.findOne({
        where: { member: { id: memberId }, team: { id: teamId } },
      });
      if (memberTeam) return memberTeam.isAdmin;
      else return null;
    } catch (error) {
      throw new InternalServerError('어드민 여부를 불러오는데 실패했습니다.');
    }
  }

  static async updateTeam(
    id: number,
    team: TeamUpdateReqDTO,
  ): Promise<Team | null> {
    try {
      const teamEntity = await TeamRepository.findOne({ where: { id } });
      if (!teamEntity) return null;
      teamEntity.color = team.color;
      teamEntity.explanation = team.explanation;
      teamEntity.teamname = team.teamname;

      return await TeamRepository.save(teamEntity);
    } catch (error) {
      throw new InternalServerError('팀 정보를 수정하는데 실패했습니다.');
    }
  }

  static async deleteTeam(id: number): Promise<boolean> {
    try {
      const result = await TeamRepository.softDelete({ id: id });
      return result.affected ? true : false;
    } catch (error) {
      throw new InternalServerError('팀 정보를 삭제하는데 실패했습니다.');
    }
  }
}
