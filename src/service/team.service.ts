import Team from '../entity/team.entity';
import TeamRepository from '../repository/team.repository';
import { TeamCreateReqDTO, TeamUpdateReqDTO } from '../type/team.dto';
import { InternalServerError } from '../util/customErrors';

export default class TeamService {
  static async saveTeam(createTeamInput: TeamCreateReqDTO): Promise<Team> {
    try {
      const teamEntity = await TeamRepository.create(createTeamInput);
      return await TeamRepository.save(teamEntity);
    } catch (error) {
      throw new InternalServerError('팀 정보를 저장하는데 실패했습니다.');
    }
  }

  static async getTeamById(id: number): Promise<Team | null> {
    try {
      return await TeamRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerError('팀 정보를 불러오는데 실패했습니다.');
    }
  }

  static async updateTeam(id: number, team: TeamUpdateReqDTO): Promise<Team> {
    try {
      const teamEntity = await TeamRepository.findOne({ where: { id } });
      const updateEntity = await TeamRepository.create(team);

      return await TeamRepository.save(teamEntity, updateEntity);
    } catch (error) {
      throw new InternalServerError('팀 정보를 수정하는데 실패했습니다.');
    }
  }

  static async deleteTeam(id: number): Promise<Team> {
    try {
      return await TeamRepository.softDelete({ id: id });
    } catch (error) {
      throw new InternalServerError('팀 정보를 삭제하는데 실패했습니다.');
    }
  }
}
