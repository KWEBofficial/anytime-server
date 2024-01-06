import AppDataSource from '../config/dataSource';
import Schedule from '../entity/schedule.entity';

const ScheRepository = AppDataSource.getRepository(Schedule).extend({});

export default ScheRepository;
