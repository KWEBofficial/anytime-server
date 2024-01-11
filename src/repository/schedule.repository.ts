import AppDataSource from '../config/dataSource';
import Schedule from '../entity/schedule.entity';

const ScheduleRepository = AppDataSource.getRepository(Schedule).extend({});

export default ScheduleRepository;
