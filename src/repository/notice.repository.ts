import AppDataSource from '../config/dataSource';
import Notice from '../entity/notice.entity';
// 예시 repository입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

const NoticeRepository = AppDataSource.getRepository(Notice).extend({});

export default NoticeRepository;
