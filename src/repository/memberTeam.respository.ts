import AppDataSource from '../config/dataSource';
import MemberTeam from '../entity/memberTeam.entity';

const MemberTeamRepository = AppDataSource.getRepository(MemberTeam).extend({});

export default MemberTeamRepository;
