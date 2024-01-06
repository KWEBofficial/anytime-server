import Notice from '../entity/notice.entity';
import Team from '../entity/team.entity';
import team from '../entity/team.entity';
import NoticeRepository from '../repository/notice.repository';
import TeamRepository from '../repository/team.repository';
import NoticeResDTO from '../type/notice.dto';
import { InternalServerError } from '../util/customErrors';

export default class NoticeService {
  static async getNoticeById(id: number): Promise<Notice[]> {
    try {
      const team = await TeamRepository.findOneOrFail({ where: { id } });
      return await NoticeRepository.find({ where: { team } });
    } catch (error) {
      throw new InternalServerError('공지사항 정보를 불러오는데 실패했습니다.');
    }
  }
}
