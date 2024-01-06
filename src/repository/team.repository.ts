import AppDataSource from '../config/dataSource';
import Team from '../entity/team.entity';

// 예시 repository입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

const UserRepository = AppDataSource.getRepository(Team).extend({});

export default UserRepository;
