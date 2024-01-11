import AppDataSource from '../config/dataSource';
import MemberSchedule from '../entity/memberSchedule.entity';

const MemberScheduleRepository = AppDataSource.getRepository(
  MemberSchedule,
).extend({});

export default MemberScheduleRepository;
