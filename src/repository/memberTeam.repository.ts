import AppDataSource from '../config/dataSource';
import MemTeam from '../entity/memberTeam.entity';

const MemTeamRepository = AppDataSource.getRepository(MemTeam).extend({});

export default MemTeamRepository;
