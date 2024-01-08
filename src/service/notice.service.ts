import { DeleteResult } from 'typeorm';
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

  static async createNotice(
    teamId: number,
    content: string,
    startDate: Date,
    endDate: Date,
    isPrior: boolean,
  ): Promise<Notice> {
    try {
      const team = await TeamRepository.findOneOrFail({
        where: { id: teamId },
      });
      return await NoticeRepository.save({
        team: team,
        content: content,
        startDate: startDate,
        endDate: endDate,
        isPrior: isPrior,
      });
    } catch (error) {
      throw new InternalServerError(
        '공지사항 정보를 저장하는데 실패하였습니다.',
      );
    }
  }

  static async updateNotice(
    id: number,
    content: string,
    startDate: Date,
    endDate: Date,
    isPrior: boolean,
  ): Promise<Notice> {
    try {
      const notice = await NoticeRepository.findOne({ where: { id: id } });
      return await NoticeRepository.save({
        id: id,
        team: notice?.team,
        content: content,
        startDate: startDate,
        endDate: endDate,
        isPrior: isPrior,
      });
    } catch (error) {
      throw new InternalServerError(
        '공지사항 정보를 수정하는데 실패하였습니다.',
      );
    }
  }

  static async deleteNotice(id: number): Promise<DeleteResult> {
    try {
      return await NoticeRepository.delete({ id: id });
    } catch (error) {
      throw new InternalServerError('공지사항을 삭제하는데 실패하였습니다.');
    }
  }
}
