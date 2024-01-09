import AppDataSource from '../config/dataSource';
import MemSche from '../entity/memberSchedule.entity';

const MemScheRepository = AppDataSource.getRepository(MemSche).extend({});

export default MemScheRepository;
