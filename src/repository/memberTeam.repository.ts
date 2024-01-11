import AppDataSource from '../config/dataSource';
import MemberTeam from '../entity/memberTeam.entity';

// 예시 repository입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

const MemberTeamRepository = AppDataSource.getRepository(MemberTeam).extend({});

export default MemberTeamRepository;
