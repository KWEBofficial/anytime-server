import AppDataSource from '../config/dataSource';
import Alarm from '../entity/alarm.entity';
const AlarmRepository = AppDataSource.getRepository(Alarm).extend({});

export default AlarmRepository;
