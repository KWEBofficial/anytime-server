import AppDataSource from '../config/dataSource';
import Member from '../entity/member.entity';

const MemberRepository = AppDataSource.getRepository(Member).extend({});

export default MemberRepository;
