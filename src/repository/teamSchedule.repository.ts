import AppDataSource from '../config/dataSource';
import TeamSche from '../entity/teamSchedule.entity';

const TeamScheRepository = AppDataSource.getRepository(TeamSche).extend({});

export default TeamScheRepository;
