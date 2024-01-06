import AppDataSource from '../config/dataSource';
import Team from '../entity/team.entity';

const TeamRepository = AppDataSource.getRepository(Team).extend({});

export default TeamRepository;
