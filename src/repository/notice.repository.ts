import AppDataSource from '../config/dataSource';
import Notice from '../entity/notice.entity';

const NoticeRepository = AppDataSource.getRepository(Notice).extend({});

export default NoticeRepository;
