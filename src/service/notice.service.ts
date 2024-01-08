import Notice from '../entity/notice.entity';
import NoticeRepository from '../repository/notice.repository';
import TeamRepository from '../repository/team.repository';
import { InternalServerError } from '../util/customErrors';

export default class NoticeService {
  static async getNoticeById(teamId: number): Promise<Notice[]> {
    try {
      const team = await TeamRepository.findOneOrFail({
        where: { id: teamId },
      });
      //return await NoticeRepository.find({ where: { team } });

      return await NoticeRepository.find({ where: { team } });
    } catch (error) {
      throw new InternalServerError('공지사항 정보를 불러오는데 실패했습니다.');
    }
  }
  static async createNotice(createNoticeInput): Promise<Notice> {
    try {
    } catch (error) {
      throw new InternalServerError(
        '공지사항 정보를 저장하는데 실패하였습니다.',
      );
    }
  }
}
