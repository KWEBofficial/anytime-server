import AppDataSource from '../config/dataSource';
import TeamSchedule from '../entity/teamSchedule.entity';

const TeamScheduleRepository = AppDataSource.getRepository(TeamSchedule).extend(
  {},
);

export default TeamScheduleRepository;
