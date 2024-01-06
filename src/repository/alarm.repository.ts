import AppDataSource from '../config/dataSource';
import Alarm from '../entity/alarm.entity';

// 예시 repository입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

const AlarmRepository = AppDataSource.getRepository(Alarm).extend({});

export default AlarmRepository;
